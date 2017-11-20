<p align="center"><img src="https://github.com/eltoncrego/vroom-app/blob/master/assets/companylogofullv2@0.5x.png?raw=true" width="500"></p>

# Vroom
The app that keeps your car running!

## Design Phase
Design of Vroom is being done in Sketch and exported to this github for easy access throughout the team. 
Please pull the repository and reference the exports/assets folders for completed designs.
If you wish to collaborate a trial or license of Sketch is necessary to do so.

Animations are being completed in AfterEffect using the BodyMovin plugin in conjunction with Lottie React Native by Airbnb. An active license of Adobe Create Cloud is necessary to work on these files.

## Development Phase 

Please follow our filename conventions! All folders should be lowercase and words within the same name should be separated by underscores.

### Layout
Always begin the file with any imports that you might need for that component. Include the following comment at the top:

```javascript
/*
 * Import all the necessary components for this page.
 * Please delete components that aren't used.
 */
```

Each import area of the component must be in the following order with examples/

```javascript
// Global Requirements
import React, { Component } from 'react';

// Components
import {
  View,
} from 'react-native';
import Animation from 'lottie-react-native';

// Files Needed
import revi from '../../../assets/animations/revi-hi.json';
```

Above a major chunk of code, defined as a function, large variable, constant, or style; use the following comment style:

```javascript
/*
 * <Type of Code Block>: <Name of Code Block>
 * Author: <Author Name>
 *
 * Purpose: <Short blurb on what the code is supposed to do>
 * 
 * @param: <any parameters passed into a method>
 * @return: <the return type of a method>
 * TODO: <anything left to do, repeat if necessary, one for each task>
 */
```

When installing new components and modules into our react-native project. Please add all shell commands to the init script with the following format:

```shell
echo "<command to be executed>";
<command to be executed>
echo "success";
```
## Error Messages
When writing error messages that are delivered to users, please record your error message in the Error Messages file, so the rest of the team can write consistent messages. 

Also keep in mind these guidelines (from Microsoft):

  A well-written error message provides the following information to the user:
  
     -What happened and why?
  
     -What is the end result for the user?
  
     -What can the user do to prevent it from happening again?
