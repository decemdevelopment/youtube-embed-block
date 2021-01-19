# Decem Gutenberg Plugin Boilerplate

## How to use

- Clone this repo to wp-content/plugins with git clone pathToThisRepo **your-plugin-name**
- `cd your-plugin-name`
- Search and replace `youtube-embed-block` to **your-plugin-name**
- Search and replace `youtube_embed_block` to **your_plugin_name** - this is used to register your plugin function to WordPress. Note the _underscore_ in function name
- Search and replace `Youtube Embed Block` with **Your Plugin Name**
- `npm i`
- `npm run start` - To compile css files to build folder. This is needed to register scripts and styles for WordPress.
- Go to WordPress Dashboard and activate your plugin.
- To test if everything is working, go to gutenberg plugin and call your block with typing /example
- Start developing

## Registering Javascript for front-end

- Make `plugins` folder inside `src`
- go to your-plugin-name.php file
- ```
    function your_plugin_name_frontend_scripts() {
        wp_enqueue_script(
            'your-plugin-script-name',
            plugins_url('src/plugins/plugin-file.js', __FILE__),
            array(),
            filemtime(plugin_dir_path(__FILE__) . 'src/plugins/plugin-file.js'),
            true
        );
    }

    add_action('wp_enqueue_scripts', 'your_plugin_name_frontend_scripts');
  ```

## Debugging

To enable better debugging experience in Gutenberg, go to wp-config.php file and add `define( 'WP_DEBUG', false )`;

## Useful URLs

- [Gutenberg's Storbook](https://wordpress.github.io/gutenberg/?path=/story/)
- [Block Filters](https://developer.wordpress.org/block-editor/developers/filters/block-filters/)
- [Block Controls: Block Toolbar and Settings Sidebar](https://developer.wordpress.org/block-editor/tutorials/block-tutorial/block-controls-toolbar-and-sidebar/)
- [Create Gutenberg Repeater](https://www.run2.co.uk/insights/create-a-repeater-field-with-gutenberg/)
