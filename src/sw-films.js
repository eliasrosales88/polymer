/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-button/paper-button.js';
import '../node_modules/@polymer/paper-card/paper-card';
import '@polymer/iron-ajax/iron-ajax.js';

class SWFilms extends PolymerElement {

  static get properties() {
    return {
      number: {
        type: Number,
        value: 1
      }
    }
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        paper-card{
          margin: 1em;
          padding: 1em
        }
        paper-button {
          --paper-button-ink-color: blue
        }
      </style>

      <paper-button id="increment">+</paper-button>
      <h1> [[ number ]] </h1>
      <paper-button on-click="decrement">-</paper-button>
      <iron-ajax
        auto
        url="https://swapi.co/api/films/"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
      </iron-ajax>
      <template is="dom-repeat" items="{{films}}" as="film">
        <paper-card>
          <div class="card-content">
            <div class="cafe-header">
              {{film.title}}
              <span>{{film.release_date}}</span>
          </div>
          <p>{{film.director}}</p>
          <p class="cafe-light"> {{film.opening_crawl}}</p>
          <card-actions>
            <div class="horizontal justified">
              <span>{{film.producer}}</span>
              <span>{{film.id}}</span>
          </card-actions>
        </paper-card>

      </template>
    `;
  }


  handleResponse(response) {
   this.films= response.detail.response.results;
    
  }

  

  constructor(){
    super();
    console.log("constructor");
  }

decrement(){
  this.number -= 1; 
}


connectedCallback() {
  super.connectedCallback();
  console.log("connected");
  
  this.shadowRoot.querySelector("#increment").addEventListener('click', () => {
    this.number += 1;
  })
  
  
  this.listaSuper = [{name: "banana"}, {name: "banana"}, {name: "banana"}, {name: "banana"}];
  
}

  
  
  ready() {
    super.ready();
    console.log("ready");
  }
  
  // disconnectedCallback() {
  //   super.connectedCallback();
  //   console.log("disconnected");
  // }

  // attributeChangedCallback() {
  //   super.attributeChangedCallback();
  //   console.log("changed");
    
  // }
}

window.customElements.define('sw-films', SWFilms);
