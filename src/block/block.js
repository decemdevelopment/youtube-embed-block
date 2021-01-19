/**
 * BLOCK: Gutenberg Plugin Boilerplate
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import { __ } from "@wordpress/i18n"; // Import __() from wp.i18n
import { registerBlockType } from "@wordpress/blocks"; // Import registerBlockType() from wp.blocks

import {
  RichText,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
  IconButton,
  Button,
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";


const parseYoutubeURL = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

const TimePicker = () => {
  return(
    <div className="time-picker">
      <input type="text"/>
      <input type="text"/>
    </div>
  )
}

registerBlockType("youtube-embed-block/example", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Youtube Embed Block"), // Block title.
  icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [__("Example"), __("Decem Block")],
  attributes: {
    youtubeURL: {
      type: "url",
      default: "",
    },
    youtubeVideoID: {
      type: 'string',
      default: ''
    },
    videoStartTime: {
      type: "string",
      defult: "00:00",
    },
  },
  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  edit: ({ setAttributes, attributes, ...props }) => {
    const [youtubeURL, setYoutubeURL] = useState('');
    const [enableTime, setEnableTime] = useState(false);
    const blockProps = useBlockProps();
    useEffect(() => {
      let id = parseYoutubeURL(youtubeURL);
      setAttributes({
        youtubeURL: youtubeURL,
        youtubeVideoID: id
      })

    }, [youtubeURL])

    const handleYoutubeUrlTextbox = (e) => {
      setAttributes({
        youtubeURL: e
      });
      setYoutubeURL(e);
    }

    const handleTogglingStartVideoTime = () => {
      setEnableTime(!enableTime)
    }
    
    return [
      <InspectorControls key="1">
        <PanelBody title={__("Youtube Embed Block")}>
          <PanelRow>
            <TextControl onChange={handleYoutubeUrlTextbox}></TextControl>
          </PanelRow>
          <PanelRow>
            <ToggleControl
              { ...props }
              help='Enable start time'
              checked={enableTime}
              onChange={ handleTogglingStartVideoTime }
            />
          </PanelRow>
          {enableTime && <PanelRow>
            <TimePicker />
          </PanelRow>}
          
          
        </PanelBody>
      </InspectorControls>,
      <div key="2" {...blockProps} className={props.className}>
        <div className="youtube-embeded-block">
          <img src={`https://img.youtube.com/vi/${attributes.youtubeVideoID}/maxresdefault.jpg`} alt=""/>
        </div>
      </div>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: (props) => {
    return (
      <div className={props.className}>
        <p>— Hello from the frontend.</p>
      </div>
    );
  },
});
