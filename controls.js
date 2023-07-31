function setupControls(){
  //top color stop
  let topCol = select('#topColor');
  let topColText = select('#topColorTxt');
  topCol.input(()=>{
    topColText.value(topCol.value());
    redraw();
  })
  topColText.changed(()=>{
    topColText.value(fixHash(topColText.value())); //fixes missing #
    if(isValidHexCode(topColText.value())){
      topCol.value(topColText.value());
      redraw();
    } else {
      topColText.value('#ERR')
    }
  })
  topColText.input(()=>{
    if(topColText.value()==='')topColText.value('#');
  })

  //bottom color stop
  let botCol = select('#botColor');
  let botColText = select('#botColorTxt');
  botCol.input(()=>{
    botColText.value(botCol.value());
    redraw();
  })
  botColText.changed(()=>{
    botColText.value(fixHash(botColText.value())); //fixes missing #
    if(isValidHexCode(botColText.value())){
      botCol.value(botColText.value());
      redraw();
    } else {
      botColText.value('#ERR')
    }
  })
  botColText.input(()=>{
    if(botColText.value()==='')botColText.value('#');
  })

  //middle color stop
  let midCheck = select('#mid_check');
  let midCol = select('#midColor');
  let midColText = select('#midColorTxt');
  let midPos = select('#midPos');
  let midPosText = select('#midPosTxt');
  
  midCol.input(()=>{
    midColText.value(midCol.value());
    redraw();
  })
  midColText.changed(()=>{
    midColText.value(fixHash(midColText.value())); //fixes missing #
    if(isValidHexCode(midColText.value())){
      midCol.value(midColText.value());
      redraw();
    } else {
      midColText.value('#ERR')
    }
  })
  midColText.input(()=>{
    if(midColText.value()==='')midColText.value('#');
  })
  //slider change
  midPos.input(()=>{
    midPosText.value(midPos.value())
    redraw();
  })
  midPosText.changed(()=>{
    midPosText.value(constrain(midPosText.value(),0,1));
    midPos.value(midPosText.value())
    redraw();
  })
  midPosText.input(()=>{
    // if(midPosText.value()=='')midPosText.value('0');
    if(midPosText.value().length > 1 && 
        midPosText.value().charAt(0) === '0' &&
        midPosText.value().charAt(1) !== '.' &&
        midPosText.value().charAt(1) !== ',') midPosText.value(midPosText.value().substring(1))
  })

  // react on checking unchecking
  midCheck.changed(()=>{
    if(midCheck.checked()){
      //enable color picker, slider, two text fields
      midCol.removeAttribute("disabled");
      midColText.removeAttribute("disabled");
      midPos.removeAttribute("disabled");
      midPosText.removeAttribute("disabled");
      //paint all
  
      redraw();
    } else {
      //disable color picker, slider, two text fields
      midCol.attribute("disabled", true);
      midColText.attribute("disabled", true);
      midPos.attribute("disabled", true);
      midPosText.attribute("disabled", true);
      //paint all grey
      
      redraw();
    }
  })


  let clearButton = select('#clear_btn');
  clearButton.mousePressed(()=> {
    dataTexture.background(255,255,0);
    A=[-1,-1,-1];
    B=[-1,-1,-2];
    redraw();
  })

  let saveButton = select('#save_btn');
  saveButton.mousePressed(()=> {
    let prev = pixelDensity();
    let timestamp = `${year()}_${month()}_${day()}_${hour()}_${minute()}_${second()}`
    pixelDensity(parseFloat(select('#density_select').value()));
    redraw();
    save(`gradientor_${timestamp}.${select('#file_type_select').value()}`);
    pixelDensity(prev);
    redraw();
  })

}

function isValidHexCode(hexCode) {
  const regexp = /^#([0-9A-Fa-f]{6})$/;
  return regexp.test(hexCode);
}
function fixHash(hexCode) {
  if (hexCode.charAt(0) !== '#') hexCode = '#' + hexCode;
  return hexCode;
}