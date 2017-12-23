import React, { Component } from 'react';
import { CloudConfig } from './CloudConfig';
import axios from 'axios';

export default class ServiceImages extends Component {
  constructor(props) {
  	super(props);
  	this.state = { classes: 'upload' }
  }

  focusUpload = (e) => this.refs.upload.focus();

	handleImage = () => {
    const imgs = this.refs.upload.files;
    const img = imgs[imgs.length - 1];
    const fd = new FormData();
    fd.append('upload_preset', CloudConfig.preset);
	  fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
	  fd.append('file', img);
    axios.post(CloudConfig.url, fd, { onUploadProgress: progressEvent => this.calcProgress(progressEvent) })
	  .then(res => {
	    let url = res.data.secure_url.split('/');
      url.splice(-2, 0, 'q_auto/f_auto/w_800,c_fill');
      url = url.join('/');
	    Meteor.call('issue.addImage', this.props.id, url, (err, res) => {
	    	if(err) console.log(err);
	    });
	  }).catch(err => console.log(err) );
  }

  calcProgress = (progressEvent) => {
  	const prog = Math.round( (progressEvent.loaded * 100) / progressEvent.total);
  	if(prog < 2) this.effectState();
  	if(prog == 100) this.uploadComplete();
  }

  effectState = () => this.setState({ classes: 'upload upload-progress' });

  uploadComplete = () => {
  	this.setState({ classes: 'upload upload-complete' });
  	setTimeout(() => { this.setState({ classes: 'upload' }) }, 500);
  }

  render = () => {
    return (
    	<section className={this.props.classes}>
    		<div>
    			<button 
    				className={this.state.classes}
    				onClick={this.focusUpload}>
    				<input 
							ref="upload"
							type="file" 
							name="myImage" 
							accept="image/*" 
							onChange={this.handleImage} />
              <img src="camera.svg" alt="uploat an image" />
							<img src='loader.gif' alt="upload in progress" />
							<img src='check-g.svg' alt="upload complete" />
					</button>
    			<h2>Service Images</h2>
    			<p>{this.props.issue.length === 1 ? `Images: ${this.props.issue[0].issue}` : ''}</p>
    			<div
    				style={{
    					flexDirection: 
    						this.props.issue.length > 0 && this.props.issue[0].images.length > 1 ? 
    						'row' : 'column'
    				}}>
    				{
    					this.props.issue.length > 0 &&
    					this.props.issue[0].images.map((image, i) => {
    						return <img
    										key={i} 
    										src={image} 
    										alt={`image of issue: ${this.props.issue[0].issue}`}
    										style={{
    											margin: this.props.issue.length > 0 && this.props.issue[0].images.length > 1 ? 
    															'0 auto 20px auto' : '0 10px 20px 10px'
    										}} /> 
    					})
    				}
    				{
    					this.props.issue.length > 0 &&
    					this.props.issue[0].images.length === 0 &&
    					<h3>Post the first image!</h3>
    				}
    			</div>
    		</div>
    	</section>
    );
  }
}

