
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-camera.Camera",
          "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "Camera"
        ]
        },
      {
          "id": "cordova-plugin-camera.CameraPopoverHandle",
          "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "CameraPopoverHandle"
        ]
        },
      {
          "id": "cordova-plugin-camera.CameraPopoverOptions",
          "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "CameraPopoverOptions"
        ]
        },
      {
          "id": "cordova-clipboard.Clipboard",
          "file": "plugins/cordova-clipboard/www/clipboard.js",
          "pluginId": "cordova-clipboard",
        "clobbers": [
          "cordova.plugins.clipboard"
        ]
        },
      {
          "id": "cordova-plugin-fingerprint-aio.Fingerprint",
          "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
          "pluginId": "cordova-plugin-fingerprint-aio",
        "clobbers": [
          "Fingerprint"
        ]
        },
      {
          "id": "cordova-plugin-camera.camera",
          "file": "plugins/cordova-plugin-camera/www/Camera.js",
          "pluginId": "cordova-plugin-camera",
        "clobbers": [
          "navigator.camera"
        ]
        },
      {
          "id": "onesignal-cordova-plugin.OneSignalPlugin",
          "file": "plugins/onesignal-cordova-plugin/dist/index.js",
          "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
          "OneSignal"
        ]
        },
      {
          "id": "onesignal-cordova-plugin.NotificationReceivedEvent",
          "file": "plugins/onesignal-cordova-plugin/dist/NotificationReceivedEvent.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.OSNotification",
          "file": "plugins/onesignal-cordova-plugin/dist/OSNotification.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.UserNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/UserNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.PushSubscriptionNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/PushSubscriptionNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.DebugNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/DebugNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.InAppMessagesNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/InAppMessagesNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.SessionNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/SessionNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.LocationNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/LocationNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.NotificationsNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/NotificationsNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        },
      {
          "id": "onesignal-cordova-plugin.LiveActivitiesNamespace",
          "file": "plugins/onesignal-cordova-plugin/dist/LiveActivitiesNamespace.js",
          "pluginId": "onesignal-cordova-plugin"
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-clipboard": "1.3.0",
      "cordova-plugin-camera": "6.0.0",
      "cordova-plugin-fingerprint-aio": "5.0.1",
      "onesignal-cordova-plugin": "5.2.4"
    };
    // BOTTOM OF METADATA
    });
    