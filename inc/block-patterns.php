<?php
/**
 * Register Block Patterns
 *
 * @package CivicSignals
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Block Patterns
 */
function civicsignals_register_block_patterns() {
	/**
	 * Register Chapter Intro Pattern
	 */
	register_block_pattern(
		'civicsignals/chapter-intro',
		array(
			'title'       => __( 'Chapter Introduction', 'civicsignals' ),
			'description' => __( 'A chapter introduction with overline, heading, and narrative paragraph.', 'civicsignals' ),
			'categories'  => array( 'civicsignals-chapters' ),
			'content'     => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl"},"margin":{"top":"0","bottom":"0"}}},"backgroundColor":"surface","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-surface-background-color has-background" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl)">
	<!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase","fontSize":"0.875rem","letterSpacing":"0.1em"},"spacing":{"margin":{"bottom":"var:preset|spacing|sm"}}},"fontSize":"small"} -->
	<p class="has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--sm);font-size:0.875rem;letter-spacing:0.1em;text-transform:uppercase">Chapter 1</p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"level":2,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|md"}}}} -->
	<h2 class="wp-block-heading" style="margin-bottom:var(--wp--preset--spacing--md)">The Problem: Lost in a Digital Maze</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem","lineHeight":"1.75"}}} -->
	<p style="font-size:1.125rem;line-height:1.75">Citizens struggle daily with outdated navigation, broken links, and confusing information architecture. The legacy site fails to meet modern expectations for accessibility and mobile responsiveness.</p>
	<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->',
		)
	);

	/**
	 * Register Persona Scene Pattern
	 */
	register_block_pattern(
		'civicsignals/persona-scene',
		array(
		'title'       => __( 'Persona Scene', 'civicsignals' ),
		'description' => __( 'A two-column layout featuring a persona quote and narrative experience.', 'civicsignals' ),
		'categories'  => array( 'civicsignals-scenes' ),
		'content'     => '<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|lg","left":"var:preset|spacing|xl"}}}} -->
<div class="wp-block-columns alignwide">
	<!-- wp:column {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","bottom":"var:preset|spacing|lg","left":"var:preset|spacing|lg","right":"var:preset|spacing|lg"}}},"backgroundColor":"surface"} -->
	<div class="wp-block-column has-surface-background-color has-background" style="padding-top:var(--wp--preset--spacing--lg);padding-right:var(--wp--preset--spacing--lg);padding-bottom:var(--wp--preset--spacing--lg);padding-left:var(--wp--preset--spacing--lg)">
		<!-- wp:heading {"level":3,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|sm"}}}} -->
		<h3 class="wp-block-heading" style="margin-bottom:var(--wp--preset--spacing--sm)">Maria – Working Parent & Citizen</h3>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem","fontStyle":"italic","lineHeight":"1.6"},"elements":{"link":{"color":{"text":"var:preset|color|primary"}}}}} -->
		<p class="has-link-color" style="font-size:1.125rem;font-style:italic;line-height:1.6">"I just want to quickly see if my family qualifies for benefits."</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","bottom":"var:preset|spacing|lg"}}}} -->
	<div class="wp-block-column" style="padding-top:var(--wp--preset--spacing--lg);padding-bottom:var(--wp--preset--spacing--lg)">
		<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem","lineHeight":"1.75"}}} -->
		<p style="font-size:1.125rem;line-height:1.75">Maria works full-time and manages her household. When she needs to check benefit eligibility, she expects to find the information quickly on her phone during her lunch break. Instead, she encounters a confusing menu system that does not work well on mobile devices.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->',
		)
	);

	/**
	 * Register Impact Metrics Pattern
	 */
	register_block_pattern(
		'civicsignals/impact-metrics',
		array(
		'title'       => __( 'Impact Metrics', 'civicsignals' ),
		'description' => __( 'A before and after comparison of key performance indicators.', 'civicsignals' ),
		'categories'  => array( 'civicsignals-scenes' ),
		'content'     => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|xl","bottom":"var:preset|spacing|xl"},"margin":{"top":"0","bottom":"0"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="margin-top:0;margin-bottom:0;padding-top:var(--wp--preset--spacing--xl);padding-bottom:var(--wp--preset--spacing--xl)">
	<!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"var:preset|spacing|xl"}}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--xl)">Impact Metrics</h2>
	<!-- /wp:heading -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|lg","left":"var:preset|spacing|lg"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","bottom":"var:preset|spacing|lg","left":"var:preset|spacing|md","right":"var:preset|spacing|md"}}},"backgroundColor":"surface"} -->
		<div class="wp-block-column has-surface-background-color has-background" style="padding-top:var(--wp--preset--spacing--lg);padding-right:var(--wp--preset--spacing--md);padding-bottom:var(--wp--preset--spacing--lg);padding-left:var(--wp--preset--spacing--md)">
			<!-- wp:paragraph {"align":"center","style":{"typography":{"textTransform":"uppercase","fontSize":"0.75rem","letterSpacing":"0.1em"},"spacing":{"margin":{"bottom":"var:preset|spacing|sm"}}},"fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--sm);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase">Task Success Rate</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|xs"}}}} -->
			<h3 class="wp-block-heading has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--xs);font-size:2.5rem;font-weight:700">62% → 94%</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size">Before → After</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","bottom":"var:preset|spacing|lg","left":"var:preset|spacing|md","right":"var:preset|spacing|md"}}},"backgroundColor":"surface"} -->
		<div class="wp-block-column has-surface-background-color has-background" style="padding-top:var(--wp--preset--spacing--lg);padding-right:var(--wp--preset--spacing--md);padding-bottom:var(--wp--preset--spacing--lg);padding-left:var(--wp--preset--spacing--md)">
			<!-- wp:paragraph {"align":"center","style":{"typography":{"textTransform":"uppercase","fontSize":"0.75rem","letterSpacing":"0.1em"},"spacing":{"margin":{"bottom":"var:preset|spacing|sm"}}},"fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--sm);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase">Time to Complete Task</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|xs"}}}} -->
			<h3 class="wp-block-heading has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--xs);font-size:2.5rem;font-weight:700">8.5m → 2.1m</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size">Before → After</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"var:preset|spacing|lg","bottom":"var:preset|spacing|lg","left":"var:preset|spacing|md","right":"var:preset|spacing|md"}}},"backgroundColor":"surface"} -->
		<div class="wp-block-column has-surface-background-color has-background" style="padding-top:var(--wp--preset--spacing--lg);padding-right:var(--wp--preset--spacing--md);padding-bottom:var(--wp--preset--spacing--lg);padding-left:var(--wp--preset--spacing--md)">
			<!-- wp:paragraph {"align":"center","style":{"typography":{"textTransform":"uppercase","fontSize":"0.75rem","letterSpacing":"0.1em"},"spacing":{"margin":{"bottom":"var:preset|spacing|sm"}}},"fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size" style="margin-bottom:var(--wp--preset--spacing--sm);font-size:0.75rem;letter-spacing:0.1em;text-transform:uppercase">Bounce Rate</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"spacing":{"margin":{"bottom":"var:preset|spacing|xs"}}}} -->
			<h3 class="wp-block-heading has-text-align-center" style="margin-bottom:var(--wp--preset--spacing--xs);font-size:2.5rem;font-weight:700">68% → 22%</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"align":"center","fontSize":"small"} -->
			<p class="has-text-align-center has-small-font-size">Before → After</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
		)
	);

	/**
	 * Register Pattern Categories
	 */
	if ( function_exists( 'register_block_pattern_category' ) ) {
		register_block_pattern_category(
			'civicsignals-chapters',
			array( 'label' => __( 'CivicSignals Chapters', 'civicsignals' ) )
		);

		register_block_pattern_category(
			'civicsignals-scenes',
			array( 'label' => __( 'CivicSignals Scenes', 'civicsignals' ) )
		);
	}
}
add_action( 'init', 'civicsignals_register_block_patterns' );

