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
  Dashicon,
  Modal
} from "@wordpress/components";

import { useState, useEffect } from "@wordpress/element";

import InputMask from "react-input-mask";

const parseYoutubeURL = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
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
      defult: "00:00:00",
    },
    isModalOpen: {
      type: 'boolean',
      default: false
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
    const [videoTime, setVideoTime] = useState('');

    const openModal = () => {
      setAttributes({
        isModalOpen: true
      })
    }

    const blockProps = useBlockProps();

    const handleYoutubeUrlTextbox = (e) => {
      setAttributes({
        youtubeURL: e
      });
      setYoutubeURL(e);
    }

    const handleTogglingStartVideoTime = () => {
      setEnableTime(!enableTime)
    }

    const handleTimeInput = (e) => {
      setVideoTime(e.target.value);
      if (videoTime) {
        console.log(videoTime);
      }
    }

    const handleSettingTime = () => {
      console.log(videoTime);
      let tempTime = videoTime;

      let regExp =  /(?:[0-9]?[0-9]):(?:[0-5]\d):(?:[0-5]\d)/

      var match = tempTime.match(regExp)

      if (match) {
        let timeArray = match[0].split(':');
        let timeInSeconds = Number(timeArray[0]) * 360 + Number(timeArray[1]) * 60 + Number(timeArray[2]);
        console.log(timeInSeconds);
      } else {
        alert('Time format you passed into input is not right. Max values are 99:59:59.')
      }

    }

    useEffect(() => {
      let id = parseYoutubeURL(youtubeURL);
      setAttributes({
        youtubeURL: youtubeURL,
        youtubeVideoID: id
      })

    }, [youtubeURL])

   
    
    return [
      <InspectorControls key="1">
        <PanelBody title={__("Youtube Embed Block")}>
          <PanelRow>
            <label>Youtube URL</label>
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
            <div>
              <label>Time</label>
              <div className="time-picker">
                {/* <input type="text" value={videoStartTime} onCh placeholder="mm:ss"/> */}
                {/* <NumberFormat format="##:##:##" mask="_" placeholder="hh:mm:ss" onChange={handleTimeInput} /> */}
                <InputMask mask="99:99:99" maskPlaceholder="hh:mm:ss" onChange={handleTimeInput} onBlur={handleSettingTime} value={attributes.videoStartTime} />
              </div>
            </div>
          </PanelRow>}
        </PanelBody>
      </InspectorControls>,
      <div key="2" {...blockProps} className={props.className}>
        <div className="youtube-embeded-block" onClick={openModal}>
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
  save: ({attributes, setAttributes, ...props}) => {
    return (
      <div key="2"className={props.className}>
        <div className="youtube-embeded-block">
          <img class="btn-modal" data-id="fin-fout-modal" src={`https://img.youtube.com/vi/${attributes.youtubeVideoID}/maxresdefault.jpg`} alt=""/>
        </div>
        <div className="modal" id="fin-fout-modal">
          <div class="m-container">
            <span class="m-close"></span>
            <div class="m-content">
              <div
                className="youtube-embeded-block__video-wrapper"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0,
                  minWidth: '80vw'
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                  className="youtube-embeded-block__video"
                  src={`https://www.youtube.com/embed/${attributes.youtubeVideoID}?&enablejsapi=1&start=132`}
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
