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

	// Add theme support for responsive embeds
	add_theme_support( 'responsive-embeds' );

	// Add editor color palette from theme.json only
	add_theme_support( 'editor-color-palette' );

	// Register navigation menus
	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'civicsignals' ),
		)
	);
}
add_action( 'after_setup_theme', 'civicsignals_setup' );

/**
 * Enqueue theme styles
 */
function civicsignals_enqueue_styles() {
	wp_enqueue_style(
		'civicsignals-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'civicsignals_enqueue_styles' );

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

	// Check if this is the related stories query (queryId 1)
	// The block context may vary, so we check multiple ways
	$query_id = isset( $block['attrs']['queryId'] ) ? $block['attrs']['queryId'] : null;
	
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
