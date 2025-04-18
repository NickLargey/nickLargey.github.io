# 1 3D Website

### Topics Covered:
- WebGL Rendering
- Loading Models:
    - Character Movement
    - Character Animation 
    - Acceleration and Decceleration
    - Quaternions:
        - A mathematical representation used to describe and manage rotations in 3D space to avoid certain issues that can result from other rotation methods, like gimbal lock, and they provide smooth interpolation for animations.
        - Gimbal Lock: Occurs when two of the three rotational axes align, causing a loss of a degree of freedom.
    - Shadow Mapping: 
        - Determines how shadows fall on an object in a 3D scene.
        - Works by rendering the scene twice: once from the perspective of the light source, and once from the perspective of the camera.
            1. a depth map is created, a grayscale image where the brightness of each pixel equals the distance from the light source.
            2. The depth map determines which parts of the scene are in shadow and applies the shading to the objects.
    - THREEJS.AnimationMixer:
        - .clipAction() -- Returns an AnimationAction for the passed clip. The first parameter can be either an AnimationClip object or the name of an AnimationClip. If an action fitting the clip and root parameters doesn't yet exist, it will be created by this method. Calling this method several times with the same clip and root parameters always returns the same clip instance. 

### Notes and Definitions:
- WebGL Data Types
    - uniform: Global variables set before you execute your shader program.

    - attribute: Used to specify how to pull data out of your buffers and provide them to your vertex shader.

    - varying: Allow a vertex shader to pass data to a fragment shader. 
               Depending on what is being rendered, points, lines, or triangles,
               the values set on a varying by a vertex shader will be interpolated while executing the fragment shader.

    - texture: Arrays of data you can randomly access in your shader program. The most common thing to put in a texture 
               is image data but textures are just data and can just as easily contain something other than colors

    - buffer: Buffers are not random access. Instead a vertex shader is executed a specified number of times. 
              Each time it's executed the next value from each specified buffer is pulled out and assigned to an attribute.