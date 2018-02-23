package com.vroom;

import com.facebook.react.ReactActivity;

import android.content.Intent;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "vroom";
    }

    protected List<ReactPackage> getPackages() {
        ReactPackage packages[] = new ReactPackage[]{
                new MainReactPackage(),
        };

        return Arrays.<ReactPackage>asList(packages);
    }
}
