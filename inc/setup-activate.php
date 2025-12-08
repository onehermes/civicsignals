<?php
/**
 * Theme Activation Setup
 *
 * Automatically sets up pages, taxonomies, demo content, and menus on theme activation.
 *
 * @package CivicSignals
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Theme activation setup function
 * Runs when the theme is activated to create default pages, terms, and content
 */
function civicsignals_theme_activate_setup() {
	// Ensure CPTs and taxonomies are registered first
	if ( function_exists( 'civicsignals_register_story_post_type' ) ) {
		civicsignals_register_story_post_type();
	}
	if ( function_exists( 'civicsignals_register_audience_taxonomy' ) ) {
		civicsignals_register_audience_taxonomy();
	}
	if ( function_exists( 'civicsignals_register_theme_taxonomy' ) ) {
		civicsignals_register_theme_taxonomy();
	}

	// Create Home page if it doesn't exist
	$home_page = get_page_by_path( 'home' );
	if ( ! $home_page ) {
		$home_page_id = wp_insert_post(
			array(
				'post_title'   => __( 'Home', 'civicsignals' ),
				'post_name'    => 'home',
				'post_content' => '',
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_author'  => 1,
			)
		);
	} else {
		$home_page_id = $home_page->ID;
	}

	// Create Stories page if it doesn't exist
	$stories_page = get_page_by_path( 'stories' );
	if ( ! $stories_page ) {
		$stories_page_id = wp_insert_post(
			array(
				'post_title'   => __( 'Stories', 'civicsignals' ),
				'post_name'    => 'stories',
				'post_content' => '',
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_author'  => 1,
			)
		);
	} else {
		$stories_page_id = $stories_page->ID;
	}

	// Set Home page as front page
	if ( $home_page_id ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $home_page_id );
	}

	// Create audience taxonomy terms
	if ( taxonomy_exists( 'audience' ) ) {
		$audience_terms = array(
			'Citizen'        => __( 'Citizen', 'civicsignals' ),
			'Content Editor' => __( 'Content Editor', 'civicsignals' ),
			'Leadership'     => __( 'Leadership', 'civicsignals' ),
		);

		$audience_term_ids = array();
		foreach ( $audience_terms as $slug => $name ) {
			$term = term_exists( $slug, 'audience' );
			if ( ! $term ) {
				$term_result = wp_insert_term(
					$name,
					'audience',
					array(
						'slug' => $slug,
					)
				);
				if ( ! is_wp_error( $term_result ) && isset( $term_result['term_id'] ) ) {
					$audience_term_ids[ $slug ] = $term_result['term_id'];
				}
			} else {
				$audience_term_ids[ $slug ] = is_array( $term ) ? $term['term_id'] : $term;
			}
		}
	}

	// Create theme taxonomy terms
	if ( taxonomy_exists( 'theme' ) ) {
		$theme_terms = array(
			'Accessibility'   => __( 'Accessibility', 'civicsignals' ),
			'Performance'     => __( 'Performance', 'civicsignals' ),
			'Modernization'   => __( 'Modernization', 'civicsignals' ),
			'Governance'      => __( 'Governance', 'civicsignals' ),
		);

		$theme_term_ids = array();
		foreach ( $theme_terms as $slug => $name ) {
			$term = term_exists( $slug, 'theme' );
			if ( ! $term ) {
				$term_result = wp_insert_term(
					$name,
					'theme',
					array(
						'slug' => strtolower( $slug ),
					)
				);
				if ( ! is_wp_error( $term_result ) && isset( $term_result['term_id'] ) ) {
					$theme_term_ids[ $slug ] = $term_result['term_id'];
				}
			} else {
				$theme_term_ids[ $slug ] = is_array( $term ) ? $term['term_id'] : $term;
			}
		}
	}

	// Check if any story posts exist
	$existing_stories = get_posts(
		array(
			'post_type'      => 'story',
			'posts_per_page' => 1,
			'post_status'    => 'any',
		)
	);

	// Create demo story if none exist
	if ( empty( $existing_stories ) && post_type_exists( 'story' ) ) {
		$demo_story_content = "## The Problem\n\nCitizens were lost. What should have been a simple task—finding information about benefits, services, or programs—became an exercise in frustration. The agency's website felt like a digital maze, built over decades with no clear navigation, broken links hidden behind outdated menus, and critical information buried three or four clicks deep.\n\n## The Solution\n\nWe transformed the digital experience by putting citizens first. Through comprehensive user research, information architecture redesign, and modern WordPress block patterns, we created an intuitive, accessible platform that serves everyone.\n\n## The Impact\n\nTask success rates improved from 62% to 94%. Time to complete tasks dropped from 8.5 minutes to 2.1 minutes. The bounce rate decreased from 68% to 22%. Behind these numbers were real improvements in citizen experience and service delivery.";

		$demo_story_id = wp_insert_post(
			array(
				'post_title'   => __( 'Modernizing the Maze: A Citizen-Centered Transformation', 'civicsignals' ),
				'post_content' => $demo_story_content,
				'post_excerpt' => __( 'A case study documenting how a federal agency transformed its digital presence to better serve citizens through modern WordPress technology and user-centered design.', 'civicsignals' ),
				'post_status'  => 'publish',
				'post_type'    => 'story',
				'post_author'  => 1,
			)
		);

		// Assign taxonomy terms to demo story if they were created
		if ( $demo_story_id && ! is_wp_error( $demo_story_id ) ) {
			// Assign audience terms
			if ( ! empty( $audience_term_ids ) && isset( $audience_term_ids['Citizen'] ) ) {
				wp_set_object_terms(
					$demo_story_id,
					array( $audience_term_ids['Citizen'] ),
					'audience'
				);
			}

			// Assign theme terms
			if ( ! empty( $theme_term_ids ) ) {
				$demo_theme_ids = array();
				if ( isset( $theme_term_ids['Accessibility'] ) ) {
					$demo_theme_ids[] = $theme_term_ids['Accessibility'];
				}
				if ( isset( $theme_term_ids['Modernization'] ) ) {
					$demo_theme_ids[] = $theme_term_ids['Modernization'];
				}
				if ( ! empty( $demo_theme_ids ) ) {
					wp_set_object_terms(
						$demo_story_id,
						$demo_theme_ids,
						'theme'
					);
				}
			}
		}
	}

	// Create Main Menu
	$menu_name   = __( 'Main Menu', 'civicsignals' );
	$menu_exists = wp_get_nav_menu_object( $menu_name );

	if ( ! $menu_exists ) {
		$menu_id = wp_create_nav_menu( $menu_name );

		if ( ! is_wp_error( $menu_id ) ) {
			// Add Home page to menu
			if ( $home_page_id ) {
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'     => __( 'Home', 'civicsignals' ),
						'menu-item-object'    => 'page',
						'menu-item-object-id' => $home_page_id,
						'menu-item-type'      => 'post_type',
						'menu-item-status'    => 'publish',
					)
				);
			}

			// Add Stories page to menu
			if ( $stories_page_id ) {
				wp_update_nav_menu_item(
					$menu_id,
					0,
					array(
						'menu-item-title'     => __( 'Stories', 'civicsignals' ),
						'menu-item-object'    => 'page',
						'menu-item-object-id' => $stories_page_id,
						'menu-item-type'      => 'post_type',
						'menu-item-status'    => 'publish',
					)
				);
			}

			// Assign menu to primary location
			$locations                 = get_theme_mod( 'nav_menu_locations' );
			$locations['primary']      = $menu_id;
			set_theme_mod( 'nav_menu_locations', $locations );
		}
	} else {
		// Menu already exists, just assign it to primary location
		$locations            = get_theme_mod( 'nav_menu_locations' );
		$locations['primary'] = $menu_exists->term_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	// Flush rewrite rules
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'civicsignals_theme_activate_setup' );

