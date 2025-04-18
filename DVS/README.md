# Digital Video Synthesis

A Piece for Advanced Digital Art and Photography Studio (ART471) at the University of Southern Maine.
The goal is to use WebGl and ThreeJS to gain a better understanding of the digital video synthesis process, graphics programming in general and to gain better control of the GPU. ThreeJS is very slow when compared with other frameworks and development languages, and has hardware limitations (There seems to be no way to offload the 3D rendering to a dedicated GPU?), but will serve as a good introduction for rapid prototyping and experience with the foundational ideas and function of graphics programming.

This tool will be used to create other works and, like all software, will never be finished. It will be continuously developed until I either:

- A. get tired of working on it
- B. start over with a systems level programming language like C++ or Rust and WASM
- C. have no time to work on it
- D. all of the above

## Approach:

1. Get understanding of [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) and [WebGL](https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html) by recreating and modifying various tutorials and documentation examples
2. Create basic scene in ThreeJS as 3D canvas for DVS
   - Generate and manipulate random shape
   - Apply basic Video Synth functions to scene, thresholding, color manipulation, blur, playing video
3. Connect hardware controller
   - Send/Read MIDI signals as control values for scene - with & w/o input audio signals
   - Separate control signals and assign to individual objects
4. Expand functionality
   - Implement more software functionality - reverb, feedback
   - Allow for assignable controls
   - Experiment by glitch to discover new possible functionality

## Requirements

- a development web server like LiveServer for Visual Studio Code or a local server like XAMPP
- a modern web browser that supports WebGL2

## Installation

- Clone the repository
- Open the project in your development environment
- Start your development server
- Open the project in your web browser

## Usage

- In development
