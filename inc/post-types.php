<?php
/**
 * Register Custom Post Types
 *
 * @package CivicSignals
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Story Post Type
 */
function civicsignals_register_story_post_type() {
	$labels = array(
		'name'                  => _x( 'Stories', 'Post Type General Name', 'civicsignals' ),
		'singular_name'         => _x( 'Story', 'Post Type Singular Name', 'civicsignals' ),
		'menu_name'             => __( 'Stories', 'civicsignals' ),
		'name_admin_bar'        => __( 'Story', 'civicsignals' ),
		'archives'              => __( 'Story Archives', 'civicsignals' ),
		'attributes'            => __( 'Story Attributes', 'civicsignals' ),
		'parent_item_colon'     => __( 'Parent Story:', 'civicsignals' ),
		'all_items'             => __( 'All Stories', 'civicsignals' ),
		'add_new_item'          => __( 'Add New Story', 'civicsignals' ),
		'add_new'               => __( 'Add New', 'civicsignals' ),
		'new_item'              => __( 'New Story', 'civicsignals' ),
		'edit_item'             => __( 'Edit Story', 'civicsignals' ),
		'update_item'           => __( 'Update Story', 'civicsignals' ),
		'view_item'             => __( 'View Story', 'civicsignals' ),
		'view_items'            => __( 'View Stories', 'civicsignals' ),
		'search_items'          => __( 'Search Story', 'civicsignals' ),
		'not_found'             => __( 'Not found', 'civicsignals' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'civicsignals' ),
		'featured_image'        => __( 'Featured Image', 'civicsignals' ),
		'set_featured_image'    => __( 'Set featured image', 'civicsignals' ),
		'remove_featured_image' => __( 'Remove featured image', 'civicsignals' ),
		'use_featured_image'    => __( 'Use as featured image', 'civicsignals' ),
		'insert_into_item'      => __( 'Insert into story', 'civicsignals' ),
		'uploaded_to_this_item' => __( 'Uploaded to this story', 'civicsignals' ),
		'items_list'            => __( 'Stories list', 'civicsignals' ),
		'items_list_navigation' => __( 'Stories list navigation', 'civicsignals' ),
		'filter_items_list'     => __( 'Filter stories list', 'civicsignals' ),
	);

	$args = array(
		'label'                 => __( 'Story', 'civicsignals' ),
		'description'           => __( 'Digital storytelling content', 'civicsignals' ),
		'labels'                => $labels,
		'supports'              => array(
			'title',
			'editor',
			'excerpt',
			'thumbnail',
			'custom-fields',
			'revisions',
		),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-book-alt',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
		'rest_base'             => 'stories',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	);

	register_post_type( 'story', $args );
}
add_action( 'init', 'civicsignals_register_story_post_type', 0 );

