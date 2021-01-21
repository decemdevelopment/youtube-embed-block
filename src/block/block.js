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
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";

import {
  PanelBody,
  PanelRow,
  TextControl,
  ToggleControl,
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
      type: "string",
      default: "",
    },
    youtubeVideoID: {
      type: 'string',
      default: ''
    },
    enableTime: {
      type: 'boolean',
      default: false
    },
    videoStartTime: {
      type: "number",
      defult: 0,
    },
    videoStartTimeDefaultFormat: {
      type: "string",
      default: ''
    }
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
    const [videoTime, setVideoTime] = useState('');
    const {videoStartTime} = attributes;

    const blockProps = useBlockProps()

    const handleYoutubeUrlTextbox = (e) => {
      setAttributes({
        youtubeURL: e
      });
      setYoutubeURL(e)
    }

    const handleTogglingStartVideoTime = (e) => {
      setAttributes({
        enableTime: e
      });
    }

    const handleTimeInput = (e) => {
      setVideoTime(e.target.value)
      setAttributes({
        videoStartTimeDefaultFormat: e.target.value
      })
    }

    const handleSettingTime = () => {
      let tempTime = videoTime;

      let regExp =  /(?:[0-9]?[0-9]):(?:[0-5]\d):(?:[0-5]\d)/

      var match = tempTime.match(regExp)

      if (match) {
        let timeArray = match[0].split(':');
        let timeInSeconds = Number(timeArray[0]) * 360 + Number(timeArray[1]) * 60 + Number(timeArray[2]);
        setAttributes({
          videoStartTime: timeInSeconds
        })
      } else {
        alert('Time format you passed into input is not valid. Max values are 99:59:59.')
      }

    }

    useEffect(() => {
      if (youtubeURL != '') {
        let id = parseYoutubeURL(youtubeURL);
        setAttributes({
          youtubeVideoID: id
        })
      }

    }, [youtubeURL])

   
    
    return [
      <InspectorControls key="1">
        <PanelBody title={__("Youtube Embed Block")}>
          <PanelRow>
            <div>
              <label>Youtube URL</label>
              <TextControl onChange={handleYoutubeUrlTextbox} value={attributes.youtubeURL}></TextControl>
            </div>
          </PanelRow>
          <PanelRow>
            <ToggleControl
              { ...props }
              help='Enable start time'
              checked={attributes.enableTime}
              onChange={ handleTogglingStartVideoTime }
            />
          </PanelRow>
          {attributes.enableTime && <PanelRow>
            <div>
              <label>Time</label>
              <div className="time-picker">
                <InputMask className="components-text-control__input" mask="99:99:99" maskplaceholder="hh:mm:ss" onChange={handleTimeInput} onBlur={handleSettingTime} value={attributes.videoStartTimeDefaultFormat} />
              </div>
            </div>
          </PanelRow>}
        </PanelBody>
      </InspectorControls>,
      <div key="2" {...blockProps} className={props.className}>
        <div className="youtube-embeded-block">
          <img src={`https://img.youtube.com/vi/${attributes.youtubeVideoID}/maxresdefault.jpg`} alt=""/>
          <svg className="youtube-embeded-block__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.051 30.051"><path d="M19.982 14.438l-6.24-4.536a.752.752 0 00-1.195.607v9.069a.75.75 0 001.195.606l6.24-4.532a.747.747 0 000-1.214z"/><path d="M15.026.002C6.726.002 0 6.728 0 15.028c0 8.297 6.726 15.021 15.026 15.021 8.298 0 15.025-6.725 15.025-15.021.001-8.3-6.727-15.026-15.025-15.026zm0 27.54c-6.912 0-12.516-5.601-12.516-12.514 0-6.91 5.604-12.518 12.516-12.518 6.911 0 12.514 5.607 12.514 12.518.001 6.913-5.603 12.514-12.514 12.514z"/></svg>
        </div>
        <div className="modal" id="fin-fout-modal">
          <div className="m-container">
            <span className="m-close"></span>
            <div className="m-content">
              <div
                className="youtube-embeded-block__video-wrapper"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0,
                  minWidth: '70vw'
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
                  src={`https://www.youtube.com/embed/${attributes.youtubeVideoID}?&enablejsapi=1${videoStartTime ? '&start=' + videoStartTime : ''}`}
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
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
    const {videoStartTime} = attributes;
    return (
      <div key="2"className={props.className}>
        <div className="youtube-embeded-block">
          <img className="btn-modal" data-id="fin-fout-modal" src={`https://img.youtube.com/vi/${attributes.youtubeVideoID}/maxresdefault.jpg`} alt=""/>
          <svg className="youtube-embeded-block__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.051 30.051"><path d="M19.982 14.438l-6.24-4.536a.752.752 0 00-1.195.607v9.069a.75.75 0 001.195.606l6.24-4.532a.747.747 0 000-1.214z"/><path d="M15.026.002C6.726.002 0 6.728 0 15.028c0 8.297 6.726 15.021 15.026 15.021 8.298 0 15.025-6.725 15.025-15.021.001-8.3-6.727-15.026-15.025-15.026zm0 27.54c-6.912 0-12.516-5.601-12.516-12.514 0-6.91 5.604-12.518 12.516-12.518 6.911 0 12.514 5.607 12.514 12.518.001 6.913-5.603 12.514-12.514 12.514z"/></svg>
        </div>
        <div className="modal" id="fin-fout-modal">
          <div className="m-container">
            <span className="m-close"></span>
            <div className="m-content">
              <div
                className="youtube-embeded-block__video-wrapper"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0,
                  minWidth: '70vw'
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
                  src={`https://www.youtube.com/embed/${attributes.youtubeVideoID}?&enablejsapi=1${videoStartTime ? '&start=' + videoStartTime : ''}`}
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
