(function($){

  "use strict";

  var pluginName = 'createForm',
      /* Enter PluginOptions */
      standardOptions = {
	      debug: true,
	      enabled: true,
	      loadImagesFirst: true,
	      container: window,
	      isHtml: false,
        formClass: 'panel_form',
        formId: 'panel_type',


        form: [],
        block: {class:'block'}
	    },

  PluginClass = function() {

    var selfObj = this,
        img = null;
    this.item = false;

    this.initOptions = new Object(standardOptions);
    
    this.init = function(elem) {
      selfObj = this;

      if(!this.container)
        this.container = window;
      this.elem = elem;
      this.item = $(this.elem);
      this.container = $(this.container);
      this.isHTML = this.item[0].tagName.toLowerCase() === 'html';

      if(!selfObj.enabled)
        return;

      this.loaded();
    };

    this.disable = function() {
      clearTimeout(selfObj.scrollTimeOut);
      selfObj.enabled = false;
    };

    this.enable = function() {
      selfObj.enabled = true;
    };

    this.loaded = function() {
      if(!selfObj.enabled)
        return;
    };


    this.add = function(data) {
      data = $.extend({
        row: 'row',
        class: '',
      },data);


      if(selfObj.form[selfObj.formClass+'_'+selfObj.block.class] === undefined)
        selfObj.form[selfObj.formClass+'_'+selfObj.block.class] = [];

      selfObj.form[selfObj.formClass+'_'+selfObj.block.class][selfObj.form[selfObj.formClass+'_'+selfObj.block.class].length] = '<div class="'+data.row+(data.class!==''?' '+data.class:'')+'">';
      selfObj.form[selfObj.formClass+'_'+selfObj.block.class][selfObj.form[selfObj.formClass+'_'+selfObj.block.class].length] = "\t"+data.field.replace(' >','>');
      selfObj.form[selfObj.formClass+'_'+selfObj.block.class][selfObj.form[selfObj.formClass+'_'+selfObj.block.class].length] = '</div>';
    }

    this.addBlock = function(data) {
      data = $.extend({
        class: 'block',
      },data);

      selfObj.block = data;
    };

    this.label = function(data) {
      var field = '';

      data = $.extend({
        label: '',
        required: false,
      },data);

      field += '<label for="'+selfObj.formId+'_'+data.name+'">';
        field += data.label+(data.required?'<span class="required">*</span>':'');
      field += '</label>';

      return field;
    }

    this.text = function(data) {
      var field = '';

      data = $.extend({
        type: 'text',
        value: '',
        required: false,
        max: false,
        min: false,
        step: false,
        label: '',
        labelPosition: 'before',
      },data);

      if(data.label && data.labelPosition === 'before') {
        field += selfObj.label(data);
      }

      field += '<input ';
        field += 'id="'+selfObj.formId+'_'+data.name+'" ';
        field += 'type="'+data.type+'" ';
        field += 'name="'+data.name+'" ';
        field += 'value="'+data.value+'" ';
        if(data.required) field += 'required="required" ';
        if(data.max) field += 'max="'+data.max+'" ';
        if(data.min) field += 'min="'+data.min+'" ';
        if(data.step) field += 'step="'+data.step+'" ';
      field += '>';

      if(data.label && data.labelPosition === 'after') {
        field += selfObj.label(data);
      }

      selfObj.add({
        field: field,
        class: data.type,
      });
    };

    this.email = function(data) {
      data = $.extend({
        type: 'email',
      },data);
      selfObj.text(data);
    };

    this.number = function(data) {
      data = $.extend({
        type: 'number',
      },data);
      selfObj.text(data);
    };

    this.select = function(data) {
      var field = [];

      data = $.extend({
        size: 1,
        required: false,
        values: {},
        class: false,
        label: '',
        labelPosition: 'before'
      },data);

      if(data.label && data.labelPosition === 'before') {
        field += selfObj.label(data);
      }

      field += '<select ';
        field += 'id="'+selfObj.formId+'_'+data.name+'" ';
        field += 'name="'+data.name+'" ';
        field += 'size="'+data.size+'" ';
        if(data.class) field += 'class="'+data.class+'" ';
        if(data.required) field += 'required="required" ';
      field += '>';

      for(var v in data.values) {
        field += "\n\t"+'<option value="'+v+'">'+data.values[v]+'</option>';
      }

      field += "\n"+'</select>';

      if(data.label && data.labelPosition === 'after') {
        field += selfObj.label(data);
      }

      selfObj.add({
        field: field,
        class: 'select'+(data.class?' '+data.class:''),
      });
    };

    this.checkbox = function(data) {
      data = $.extend({
        type: 'checkbox',
        value: 1,
        labelPosition: 'after',
      },data);
      selfObj.text(data);
    };

    this.radio = function(data) {
      data = $.extend({
        type: 'radio',
        value: 1,
        labelPosition: 'after',
      },data);
      selfObj.text(data);
    };

    this.textarea = function(data) {
      var field = '';

      data = $.extend({
        type: 'text',
        value: '',
        required: false,
        rows: false,
        cols: false,
        label: '',
        labelPosition: 'before',
      },data);

      if(data.label && data.labelPosition === 'before') {
        field += selfObj.label(data);
      }

      field += '<textarea ';
        field += 'name="'+data.name+'" ';
        if(data.rows) field += 'rows="'+data.rows+'" ';
        if(data.cols) field += 'cols="'+data.cols+'" ';
        if(data.required) field += 'required="required" ';
      field += '>';
        field += data.value;
      field += '</textarea>';

      if(data.label && data.labelPosition === 'after') {
        field += selfObj.label(data);
      }

      selfObj.add({
        field: field,
        class: data.type,
      });
    };

    this.generate = function() {
      var form = '';
      for(var i in selfObj.form) {
        form += '<div class="'+i+'">'+"\n";
          form += selfObj.form[i].join("\n");
        form += "\n"+'</div>'+"\n";
      }
      return form;
    };
  };

  $[pluginName] = $.fn[pluginName] = function(settings) {
    var element = typeof this === 'function'?$('html'):this,
	newData = arguments[1]||{},
	returnElement = [];
        
    returnElement[0] = element.each(function(k,i) {
      var pluginClass = $.data(this, pluginName);

      if(!settings || typeof settings === 'object' || settings === 'init') {

        if(!pluginClass) {
          if(settings === 'init')
            settings = arguments[1] || {};
          pluginClass = new PluginClass();

          var newOptions = new Object(pluginClass.initOptions);

          /* Space to reset some standart options */

          /***/

          if(settings)
            newOptions = $.extend(true,{},newOptions,settings);
          pluginClass = $.extend(newOptions,pluginClass);
          /** Initialisieren. */
          this[pluginName] = pluginClass;
          pluginClass.init(this);
          if(element.prop('tagName').toLowerCase() !== 'html')
          	$.data(this, pluginName, pluginClass);
        } else {
	  pluginClass.init(this,1);
	  if(element.prop('tagName').toLowerCase() !== 'html')
	    $.data(this, pluginName, pluginClass);
        }
      } else if(!pluginClass) {
        return;
      } else if(pluginClass[settings]) {
        var method = settings;
        returnElement[1] = pluginClass[method](newData);
      } else {
        return;
      }
    });

    if(returnElement[1] !== undefined) return returnElement[1];
      return returnElement[0];

  };
  
})(jQuery);
