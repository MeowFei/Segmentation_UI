class customCanvas extends fabric.Canvas
{
  constructor(el, optionsopt)
  {
    super(el, optionsopt);
    this.mode = new States();
  }

  // _setCursorFromEvent(e, target)
  // {
  //
  // }

  setCursorToDefault()
  {
    this.cursorMap = ['n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize', 'nw-resize'];
    this.defaultCursor = 'default';
    this.freeDrawingCursor = 'crosshair';
    this.hoverCursor = 'move';
    this.moveCursor = 'move';
    this.rotationCursor = 'crosshair';
  }

  setDrawingCursor()
  {
    this.cursorMap = ['default','default','default','default','default','default','default','default'];
    this.defaultCursor = 'default';
    this.freeDrawingCursor = 'default';
    this.hoverCursor = 'default';
    this.moveCursor = 'default';
    this.rotationCursor = 'default';
  }

  setSelectCursor()
  {
    this.cursorMap = ['crosshair','crosshair','crosshair','crosshair','crosshair','crosshair','crosshair','crosshair'];
    this.defaultCursor = 'crosshair';
    this.freeDrawingCursor = 'crosshair';
    this.hoverCursor = 'crosshair';
    this.moveCursor = 'crosshair';
    this.rotationCursor = 'crosshair';
  }

  setResizeCursor()
  {
    this.cursorMap = ['n-resize', 'ne-resize', 'e-resize', 'se-resize', 's-resize', 'sw-resize', 'w-resize', 'nw-resize'];
    this.defaultCursor = 'default';
    this.freeDrawingCursor = 'default';
    this.hoverCursor = 'default';
    this.moveCursor = 'default';
    this.rotationCursor = 'default';
  }

  setMoveCursor()
  {
    this.cursorMap = ['default','default','default','default','default','default','default','default'];
    this.defaultCursor = 'default';
    this.freeDrawingCursor = 'default';
    this.hoverCursor = 'move';
    this.moveCursor = 'move';
    this.rotationCursor = 'default';
  }

  setDeleteCursor()
  {
    this.cursorMap = ['default','default','default','default','default','default','default','default'];
    this.defaultCursor = 'default';
    this.freeDrawingCursor = 'default';
    this.hoverCursor = 'default';
    this.moveCursor = 'default';
    this.rotationCursor = 'default';
  }

  setBackground(imagePath)
  {
    var canvas = this;
    var tempImg = new Image();
    var tempFabricImg;
    tempImg.src = imagePath;

    tempImg.onload = function() {
      // var windowWidth = window.innerWidth;
      // var windowHeight = window.innerHeight;
      var windowWidth = window.outerWidth;
      var windowHeight = window.outerHeight;
      var imgAdjustedWidth = windowWidth * 0.8;
      var imgAdjustedHeight = windowHeight * 0.8;

      var widthRatio = imgAdjustedWidth/tempImg.width;
      var heightRatio = imgAdjustedHeight/tempImg.height;

      if(heightRatio < widthRatio)
        widthRatio = heightRatio;
      else
        heightRatio = widthRatio;

        console.log(widthRatio);
      /*I was going to adjust the heigth and width
      with the size of the window, but then I realized that
      this will require the final result to be adjusted -
      not sure if this is a good thing to do */
      tempImg.width = Math.max(tempImg.width * 0.3, tempImg.width * widthRatio);
      tempImg.height = Math.max(tempImg.height * 0.3, tempImg.height * heightRatio);
      canvasWidth = tempImg.width;
      canvasHeight= tempImg.height;
      tempFabricImg = new fabric.Image(tempImg, {
        evented : false,
        originX : 'left',
        originY : 'top'
      });
      canvas.setBackgroundImage(tempFabricImg, canvas.renderAll.bind(canvas), {
        originX: 'left',
        originY: 'top'
      });
      canvas.setHeight(canvasHeight);
      canvas.setWidth(canvasWidth);
      canvas.calcOffset();
      //$('canvas').addClass('center');
    }
  }

  addScalingEvent()
  {
    this.on('object:scaling', function(event){
      //console.log(event);
      var rect = event.target;

      rect.setCoords();
      var sides = rect.getSides();
      var w = sides.right - sides.left - 1;
      var h = sides.bottom - sides.top - 1;

      if(sides.left<= 0)
      {
        //console.log('left');
        rect.set({"left" : 0 });
        w = sides.right - 1;
      }

      if(sides.right >= this.getWidth())
      {
        //console.log('right');
        w = this.getWidth() - sides.left - 1;//might not need the -1
      }

      if(sides.top <= 0)
      {
        //console.log('top');
        rect.set({"top" : 0 });
        h = sides.bottom - 1;
      }

      if(sides.bottom >= this.getHeight())
      {
        //console.log('bottom');
        h = this.getHeight() - sides.top - 1;
      }

      rect.set({
        'height': h,
        'width' : w,
        'scaleX': 1,
        'scaleY': 1
      });


      rect.setCoords();
      this.renderAll();
    });
  }

  addMovingEvent()
  {
    this.on('object:moving', function(event){
      var rect = event.target;

      rect.setCoords();
      var w = rect.width;
      var h = rect.height;
      var sides = rect.getSides();

      if(sides.left<= 0)
      {
        rect.set({"left" : 0 });
      }

      if(sides.right >= this.getWidth())
      {
        rect.set({"left" : this.getWidth() - w - 1});
      }

      if(sides.top <= 0)
      {
        rect.set({"top" : 0 });
      }

      if(sides.bottom >= this.getHeight())
      {
        rect.set({"top" : this.getHeight - h - 1});
      }

      rect.setCoords();
      this.renderAll();

    })
  }


}
