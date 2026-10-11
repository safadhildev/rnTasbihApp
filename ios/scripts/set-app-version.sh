#!/bin/sh
set -eu

VERSION_FILE="${SRCROOT}/../version.json"

if [ ! -f "$VERSION_FILE" ]; then
  echo "error: version.json not found at $VERSION_FILE" >&2
  exit 1
fi

VERSION=$(node -p "require('${VERSION_FILE}').version")
BUILD=$(node -p "require('${VERSION_FILE}').build")
PLIST="${TARGET_BUILD_DIR}/${INFOPLIST_PATH}"

if [ ! -f "$PLIST" ]; then
  echo "error: built Info.plist not found at $PLIST" >&2
  exit 1
fi

/usr/libexec/PlistBuddy -c "Set :CFBundleShortVersionString ${VERSION}" "$PLIST"
/usr/libexec/PlistBuddy -c "Set :CFBundleVersion ${BUILD}" "$PLIST"

echo "Set iOS version to ${VERSION} (${BUILD})"
