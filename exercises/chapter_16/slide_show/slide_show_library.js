var $ = function (id) { return document.getElementById(id); }

var SlideShow = function ( params ) {
    var that = this;

    // Store references to the element nodes as properties
    if ( !params ) params = {};
    this.listNode = $(params.listId);
    this.imageNode = $(params.imageId);
    this.captionNode = $(params.captionId);
    this.previousNode = $(params.previousId);
    this.playNode = $(params.playId);
    this.playPauseNode = $(params.playPauseId);
    this.nextNode = $(params.nextId);
    this.speedNode = $(params.speedId);

    // Validate nodes
    this.validateNode( this.listNode, "*", "List ID");
    this.validateNode( this.imageNode, "img", "Image ID");
    this.validateNode( this.captionNode, "span", "Caption ID");
    this.validateNode( this.previousNode, "button", "Previous Button ID");
    this.validateNode( this.playNode, "button", "Play Button ID");
    this.validateNode( this.playPauseNode, "img", "PlayPause Image ID");
    this.validateNode( this.nextNode, "button", "Next Button ID");
    this.validateNode( this.speedNode, "input", "Speed Button ID");

    // Define application parameters
    this.imageCounter = 0;
    this.play = true;
    this.fast = 3000;
    this.slow = 8000;
    this.speed = this.fast;

    // Retrieve image links
    this.imageLinks = this.listNode.getElementsByTagName("a");
    if ( this.imageLinks.length == 0 ) {
        throw new Error("Slide Show: List ID contains no image links.");
    }

    // Process image links
    var i, node, image;
    this.imageCache = [];
    for ( i = 0; i < this.imageLinks.length; i++ ) {
        node = this.imageLinks[i];
        // Preload image and copy title properties
        image = new Image();
        image.src = node.href;
        image.title = node.title;
        this.imageCache.push( image );
    }

    // Create event handlers
    this.playClick = function () {
        that.togglePlay();
        that.playNode.blur();
    }
    this.previousClick = function () {
        that.displayPrevImage();
        that.previousNode.blur();
    }
    this.nextClick = function () {
        that.displayNextImage();
        that.nextNode.blur();
    }
    this.speedClick = function () {
        that.toggleSpeed();
        that.speedNode.blur();
    }
    this.appKeydown = function (evt) {
        switch ( evt.keyIdentifier ) {
            case "U+0020":  // Space bar
                that.togglePlay();
                break;
            case "Left":    // Left arrow
                if ( ! that.play ) that.displayPrevImage();
                break;
            case "Right":   // Right arrow
                if ( ! that.play ) that.displayNextImage();
                break;
            case "U+001B":  // Escape key
                that.imageCounter = 0;
                that.displayImage();
                if ( that.speed == that.slow ) that.toggleSpeed();
                if ( ! that.play ) that.togglePlay();
                break;
        }
    }
    this.imageMousedown = function (evt) {
        if (evt.button == 0 ) {
            if ( evt.getModifierState("Shift") ) {
                that.togglePlay();
            } else if ( ! that.play ) {
                that.displayNextImage();
            }
        }
    }
    this.imageContextmenu = function (evt) {
        if ( ! that.play ) {
            that.displayPrevImage();
            evt.preventDefault();
        }
    }

    // Attach event handlers
    jsLib.event.add ( this.playNode, "click", this.playClick );
    jsLib.event.add ( this.previousNode, "click", this.previousClick );
    jsLib.event.add ( this.nextNode, "click", this.nextClick );
    jsLib.event.add ( this.speedNode, "click", this.speedClick );
    jsLib.event.add ( document, "keydown", this.appKeydown );
    jsLib.event.add ( this.imageNode, "mousedown", this.imageMousedown );
    jsLib.event.add ( this.imageNode, "contextmenu", this.imageContextmenu );

    // Set button states
    this.previousNode.disabled = true;
    this.nextNode.disabled = true;

    // Start slide show
    this.timer = setInterval(
        function () { that.displayNextImage(); },
        this.speed
    );
}

SlideShow.prototype.validateNode = function ( node, nodeName, nodeDesc ) {
    if ( ! node ) {
        throw new Error("Slide Show: " + nodeDesc + " not found.");
    }
    if ( node.nodeType !== 1 ) {
        throw new Error("Slide Show: " + nodeDesc +
            " is not an element node.");
    } 
    if ( nodeName != "*" && node.nodeName !== nodeName.toUpperCase() ) {
        throw new Error("Slide Show: " + nodeDesc +
            " is not a " + nodeName.toLowerCase() + " tag.");
    }
}

SlideShow.prototype.displayImage = function () {
    var image = this.imageCache[this.imageCounter];
    this.imageNode.src = image.src;
    this.captionNode.firstChild.nodeValue = image.title;
}

SlideShow.prototype.displayNextImage = function () {
    this.imageCounter = ++this.imageCounter % this.imageCache.length;
    this.displayImage();
}

SlideShow.prototype.displayPrevImage = function () {
    this.imageCounter =
        (this.imageCounter + this.imageCache.length - 1) %
        this.imageCache.length;
    this.displayImage();
}

SlideShow.prototype.togglePlay = function () {
    var that = this;
    if ( this.play ) {
        clearInterval( this.timer );
        this.playPauseNode.src = "play.gif";
        this.previousNode.disabled = false;
        this.nextNode.disabled = false;
    } else {
        this.timer = setInterval(
            function () { that.displayNextImage(); },
            this.speed
        );
        this.playPauseNode.src = "pause.gif";
        this.previousNode.disabled = true;
        this.nextNode.disabled = true;
    }
    this.play = ! this.play;
}

SlideShow.prototype.toggleSpeed = function () {
    var that = this;
    if ( this.speedNode.value == "Fast" ) {
        this.speedNode.value = "Slow";
        this.speed = this.slow;
    } else {
        this.speedNode.value = "Fast";
        this.speed = this.fast;
    }

    if ( this.play ) {
        clearInterval( this.timer );
        this.timer = setInterval(
            function () { that.displayNextImage(); },
            this.speed
        );
    }
}