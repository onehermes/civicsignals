<?php
/**
 * Register Custom Taxonomies
 *
 * @package CivicSignals
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Audience Taxonomy
 */
function civicsignals_register_audience_taxonomy() {
	$labels = array(
		'name'                       => _x( 'Audiences', 'Taxonomy General Name', 'civicsignals' ),
		'singular_name'              => _x( 'Audience', 'Taxonomy Singular Name', 'civicsignals' ),
		'menu_name'                  => __( 'Audiences', 'civicsignals' ),
		'all_items'                  => __( 'All Audiences', 'civicsignals' ),
		'parent_item'                => __( 'Parent Audience', 'civicsignals' ),
		'parent_item_colon'          => __( 'Parent Audience:', 'civicsignals' ),
		'new_item_name'              => __( 'New Audience Name', 'civicsignals' ),
		'add_new_item'               => __( 'Add New Audience', 'civicsignals' ),
		'edit_item'                  => __( 'Edit Audience', 'civicsignals' ),
		'update_item'                => __( 'Update Audience', 'civicsignals' ),
		'view_item'                  => __( 'View Audience', 'civicsignals' ),
		'separate_items_with_commas' => __( 'Separate audiences with commas', 'civicsignals' ),
		'add_or_remove_items'        => __( 'Add or remove audiences', 'civicsignals' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'civicsignals' ),
		'popular_items'              => __( 'Popular Audiences', 'civicsignals' ),
		'search_items'               => __( 'Search Audiences', 'civicsignals' ),
		'not_found'                  => __( 'Not Found', 'civicsignals' ),
		'no_terms'                   => __( 'No audiences', 'civicsignals' ),
		'items_list'                 => __( 'Audiences list', 'civicsignals' ),
		'items_list_navigation'      => __( 'Audiences list navigation', 'civicsignals' ),
	);

	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => false,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'show_in_rest'               => true,
		'rest_base'                  => 'audiences',
		'rest_controller_class'      => 'WP_REST_Terms_Controller',
	);

	register_taxonomy( 'audience', array( 'story' ), $args );
}
add_action( 'init', 'civicsignals_register_audience_taxonomy', 0 );

/**
 * Register Theme Taxonomy
 */
function civicsignals_register_theme_taxonomy() {
	$labels = array(
		'name'                       => _x( 'Themes', 'Taxonomy General Name', 'civicsignals' ),
		'singular_name'              => _x( 'Theme', 'Taxonomy Singular Name', 'civicsignals' ),
		'menu_name'                  => __( 'Themes', 'civicsignals' ),
		'all_items'                  => __( 'All Themes', 'civicsignals' ),
		'parent_item'                => __( 'Parent Theme', 'civicsignals' ),
		'parent_item_colon'          => __( 'Parent Theme:', 'civicsignals' ),
		'new_item_name'              => __( 'New Theme Name', 'civicsignals' ),
		'add_new_item'               => __( 'Add New Theme', 'civicsignals' ),
		'edit_item'                  => __( 'Edit Theme', 'civicsignals' ),
		'update_item'                => __( 'Update Theme', 'civicsignals' ),
		'view_item'                  => __( 'View Theme', 'civicsignals' ),
		'separate_items_with_commas' => __( 'Separate themes with commas', 'civicsignals' ),
		'add_or_remove_items'        => __( 'Add or remove themes', 'civicsignals' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'civicsignals' ),
		'popular_items'              => __( 'Popular Themes', 'civicsignals' ),
		'search_items'               => __( 'Search Themes', 'civicsignals' ),
		'not_found'                  => __( 'Not Found', 'civicsignals' ),
		'no_terms'                   => __( 'No themes', 'civicsignals' ),
		'items_list'                 => __( 'Themes list', 'civicsignals' ),
		'items_list_navigation'      => __( 'Themes list navigation', 'civicsignals' ),
	);

	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'show_in_rest'               => true,
		'rest_base'                  => 'themes',
		'rest_controller_class'      => 'WP_REST_Terms_Controller',
	);

	register_taxonomy( 'theme', array( 'story' ), $args );
}
add_action( 'init', 'civicsignals_register_theme_taxonomy', 0 );

