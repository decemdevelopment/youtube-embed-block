<?php
/*
Plugin Name: Youtube Embed Block
*/

function youtube_embed_block_register_block()
{

	// Register JavasScript File build/index.js
	wp_register_script(
		'youtube-embed-block',
		plugins_url('build/index.js', __FILE__),
		array('wp-blocks', 'wp-element', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
	);

	// Register editor style build/index.css
	wp_register_style(
		'youtube-embed-block-editor-style',
		plugins_url('build/index.css', __FILE__),
		array('wp-edit-blocks'),
		filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
	);

	// Register front end block style build/style-index.css
	wp_register_style(
		'youtube-embed-block-frontend-style',
		plugins_url('build/style-index.css', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
	);

	// Register your block
	register_block_type('youtube-embed-block/example', array(
		'editor_script' => 'youtube-embed-block',
		'editor_style' => 'youtube-embed-block-editor-style',
		'style' => 'youtube-embed-block-frontend-style',
	));
}

add_action('init', 'youtube_embed_block_register_block');

function your_plugin_name_frontend_scripts()
{
	wp_enqueue_script(
		'youtube_embed_block_modal',
		plugins_url('src/plugins/modal.js', __FILE__),
		array(),
		filemtime(plugin_dir_path(__FILE__) . 'src/plugins/modal.js'),
		true
	);
}

add_action('wp_enqueue_scripts', 'your_plugin_name_frontend_scripts');
