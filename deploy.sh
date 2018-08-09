#!/bin/bash

set -e

ROOTDIR="/var/www/coop/resonate/root/"
PUBLICDIR="public/"

hugo

chmod -fR g-w $PUBLICDIR
chmod -fR o-rwx $PUBLICDIR
rsync -av --delete-after public/* $ROOTDIR
chgrp -fR www-data $ROOTDIR
