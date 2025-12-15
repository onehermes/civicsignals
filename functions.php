<?php
/**
 * CivicSignals Theme Functions
 *
 * @package CivicSignals
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Load theme files
 */
require_once get_template_directory() . '/inc/post-types.php';
require_once get_template_directory() . '/inc/taxonomies.php';
require_once get_template_directory() . '/inc/block-patterns.php';
require_once get_template_directory() . '/inc/setup-activate.php';

/**
 * Theme setup and support
 */
function civicsignals_setup() {
	// Add theme support for document title tag
	add_theme_support( 'title-tag' );

	// Add theme support for post thumbnails
	add_theme_support( 'post-thumbnails' );

	// Add theme support for block styles
	add_theme_support( 'wp-block-styles' );

	// Add theme support for editor styles
	add_theme_support( 'editor-styles' );
	add_editor_style( array( 'style.css', 'editor-style.css' ) );

	// Add theme support for responsive embeds
	add_theme_support( 'responsive-embeds' );

	// Add editor color palette from theme.json only
	add_theme_support( 'editor-color-palette' );

	// Add theme support for wide and full-width alignments
	add_theme_support( 'align-wide' );

	// Add theme support for HTML5 markup
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'script',
		'style',
	) );

	// Add support for block template parts
	add_theme_support( 'block-template-parts' );

	// Add support for custom logo (2025 best practice)
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 100,
			'width'       => 400,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	// Add support for selective refresh for widgets
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for default block styles (2025 best practice)
	add_theme_support( 'wp-block-styles' );

	// Add support for custom units in block editor
	add_theme_support( 'custom-units', array( 'px', 'em', 'rem', 'vh', 'vw', '%' ) );

	// Add support for custom spacing scale (modern spacing system)
	add_theme_support( 'custom-spacing' );

	// Add support for link color (2025 best practice)
	add_theme_support( 'link-color' );

	// Add support for experimental block features
	add_theme_support( 'appearance-tools' );

	// Add support for lazy-loading images (WordPress 5.5+)
	add_filter( 'wp_lazy_loading_enabled', '__return_true' );

	// Register navigation menus
	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'civicsignals' ),
			'footer'  => __( 'Footer Menu', 'civicsignals' ),
		)
	);
}
add_action( 'after_setup_theme', 'civicsignals_setup' );

/**
 * Preconnect to external resources for performance
 */
function civicsignals_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.googleapis.com',
			'crossorigin',
		);
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'civicsignals_resource_hints', 10, 2 );

/**
 * Enqueue theme styles and fonts
 */
function civicsignals_enqueue_assets() {
	$theme_version = wp_get_theme()->get( 'Version' );
	
	// Enqueue Inter font from Google Fonts with display=swap for better performance
	wp_enqueue_style(
		'civicsignals-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	// Enqueue theme stylesheet
	wp_enqueue_style(
		'civicsignals-style',
		get_stylesheet_uri(),
		array( 'civicsignals-fonts' ),
		$theme_version
	);

	// Enqueue accessibility script first (foundation for all interactive elements)
	wp_enqueue_script(
		'civicsignals-accessibility',
		get_template_directory_uri() . '/assets/js/accessibility.js',
		array(),
		$theme_version,
		true
	);

	// Enqueue cursor interaction script (depends on accessibility for proper focus handling)
	wp_enqueue_script(
		'civicsignals-cursor',
		get_template_directory_uri() . '/assets/js/cursor-interaction.js',
		array( 'civicsignals-accessibility' ),
		$theme_version,
		true
	);

	// Enqueue scroll animations script
	wp_enqueue_script(
		'civicsignals-scroll-animations',
		get_template_directory_uri() . '/assets/js/scroll-animations.js',
		array( 'civicsignals-accessibility' ),
		$theme_version,
		true
	);

	// Enqueue chapter numbers script (only on single story pages)
	// Depends on scroll-animations for reveal animations
	if ( is_singular( 'story' ) ) {
		wp_enqueue_script(
			'civicsignals-chapter-numbers',
			get_template_directory_uri() . '/assets/js/chapter-numbers.js',
			array( 'civicsignals-accessibility', 'civicsignals-scroll-animations' ),
			$theme_version,
			true
		);
	}
}
add_action( 'wp_enqueue_scripts', 'civicsignals_enqueue_assets' );

/**
 * Filter query for related stories on single story pages
 * Shows stories that share at least one theme term, falls back to recent stories
 */
function civicsignals_filter_related_stories_query( $query_args, $block ) {
	// Only apply on single story pages
	if ( ! is_singular( 'story' ) ) {
		return $query_args;
	}

	// Only apply to story post type queries
	if ( ! isset( $query_args['post_type'] ) || 'story' !== $query_args['post_type'] ) {
		return $query_args;
	}

	// Get block attributes - handle both WP_Block object and array
	$block_attrs = array();
	if ( is_object( $block ) && property_exists( $block, 'parsed_block' ) && isset( $block->parsed_block['attrs'] ) ) {
		// WP_Block object - access parsed_block property
		$block_attrs = $block->parsed_block['attrs'];
	} elseif ( is_array( $block ) && isset( $block['attrs'] ) ) {
		// Array format
		$block_attrs = $block['attrs'];
	}

	// Check if this is the related stories query (queryId 1)
	$query_id = isset( $block_attrs['queryId'] ) ? $block_attrs['queryId'] : null;
	
	// If queryId is 1, or if we're in single-story template context
	if ( 1 === $query_id || is_singular( 'story' ) ) {
		// Get current post ID
		$current_post_id = get_the_ID();

		// Get theme terms for current story
		$theme_terms = wp_get_post_terms( $current_post_id, 'theme', array( 'fields' => 'ids' ) );

		// If we have theme terms, filter by them
		if ( ! empty( $theme_terms ) && ! is_wp_error( $theme_terms ) ) {
			$query_args['tax_query'] = array(
				array(
					'taxonomy' => 'theme',
					'field'    => 'term_id',
					'terms'    => $theme_terms,
					'operator' => 'IN',
				),
			);
		}

		// Exclude current post
		if ( ! isset( $query_args['post__not_in'] ) || ! is_array( $query_args['post__not_in'] ) ) {
			$query_args['post__not_in'] = array();
		}
		$query_args['post__not_in'][] = $current_post_id;
	}

	return $query_args;
}
add_filter( 'query_loop_block_query_vars', 'civicsignals_filter_related_stories_query', 10, 2 );

/**
 * Add async/defer attributes to scripts where appropriate (2025 performance best practice)
 */
function civicsignals_script_loader_tag( $tag, $handle, $src ) {
	// Scripts that can be deferred for better performance
	$defer_scripts = array(
		'civicsignals-accessibility',
		'civicsignals-scroll-animations',
	);

	if ( in_array( $handle, $defer_scripts, true ) ) {
		return str_replace( ' src', ' defer src', $tag );
	}

	return $tag;
}
add_filter( 'script_loader_tag', 'civicsignals_script_loader_tag', 10, 3 );

/**
 * Add security headers (2025 best practice)
 */
function civicsignals_security_headers() {
	if ( ! is_admin() ) {
		header( 'X-Content-Type-Options: nosniff' );
		header( 'X-Frame-Options: SAMEORIGIN' );
		header( 'X-XSS-Protection: 1; mode=block' );
		header( 'Referrer-Policy: strict-origin-when-cross-origin' );
	}
}
add_action( 'send_headers', 'civicsignals_security_headers' );

/**
 * Disable emoji scripts (performance optimization - 2025 best practice)
 * Only disable if not needed for content
 */
function civicsignals_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'civicsignals_disable_emojis' );

/**
 * Add schema.org structured data support (2025 SEO best practice)
 */
function civicsignals_schema_markup() {
	if ( is_singular( 'story' ) ) {
		$schema = array(
			'@context' => 'https://schema.org',
			'@type'    => 'Article',
			'headline' => get_the_title(),
			'author'   => array(
				'@type' => 'Organization',
				'name'  => get_bloginfo( 'name' ),
			),
			'datePublished' => get_the_date( 'c' ),
			'dateModified'  => get_the_modified_date( 'c' ),
		);

		if ( has_post_thumbnail() ) {
			$schema['image'] = get_the_post_thumbnail_url( get_the_ID(), 'full' );
		}

		echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>';
	}
}
add_action( 'wp_head', 'civicsignals_schema_markup', 5 );

/**
 * Improve image loading performance (2025 best practice)
 */
function civicsignals_image_loading_attributes( $attr, $attachment, $size ) {
	// Ensure lazy loading is enabled
	$attr['loading'] = 'lazy';
	
	// Add decoding async for better performance
	$attr['decoding'] = 'async';
	
	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'civicsignals_image_loading_attributes', 10, 3 );
