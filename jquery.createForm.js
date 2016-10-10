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

        generateForm: function(){},

        form: [],
        block: {class:'block',suffix:''}
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
        temp: false,
        return: false,
      },data);

      if(!data.return) {
        if(selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')] === undefined)
          selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')] = [];

        selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')][selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')].length] = '<div class="'+data.row+(data.class!==''?' '+data.class:'')+'">';
        selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')][selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')].length] = "\t"+data.field.replace(' >','>');
        selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')][selfObj.form[(selfObj.block.temp?'temp_':'')+selfObj.formClass+'_'+selfObj.block.class+(selfObj.block.suffix?'_suffix-'+selfObj.block.suffix:'')].length] = '</div>';
      } else {
        var block = '';

        block += '<div class="'+data.row+(data.class!==''?' '+data.class:'')+'">';
        block += "\t"+data.field.replace(' >','>');
        block += '</div>';

        return block;
      }

      return false;
    }

    this.addBlock = function(data) {
      data = $.extend({
        class: 'block',
        suffix: '',
        create: function(){},
      },data);

      data.create(selfObj);

      selfObj.block = data;
    };

    this.label = function(data) {
      var field = '',
          tags = false,
          tags_desc = false;

      data = $.extend({
        label: '',
        id: false,
        required: false,
        href: false,
        target: '_blank',
      },data);

      tags = data.label.match(/{{[^}]+}}/g);
      tags_desc = data.label.match(/{{[^}]+}}/g);

      field += '<label for="'+selfObj.formId+'_'+(data.id?selfObj.normalize(data.id):selfObj.normalize(data.name))+'"'+(data.description?' class="has_desc"':'')+'>';
        if(data.href) {
          if(tags) {
            data.label = data.label.replace('{{','<a href="'+data.href+'" target="'+data.target+'">');
            data.label = data.label.replace('}}','</a>');
          } else {
            field += '<a href="'+data.href+'" target="'+data.target+'">';
          }
        }
        field += data.label+(data.required?'<span class="required">*</span>':'');
        if(data.href && !tags) field += '</a>';
        if(data.description) {
          if(tags_desc) {
            data.description = data.description.replace('{{','<a href="'+data.href+'" target="'+data.target+'">');
            data.description = data.description.replace('}}','</a>');
          }
          field += '<span class="desc">'+data.description+'</span>';
        }
      field += '</label>';

      return field;
    }

    this.normalize = function(data) {
      return data.replace(/[^a-zA-Z0-9_\-.:]+/g,'_').replace('__','_');
    };

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
        class: '',
        id: false,
        dataAttr: {},
        select: function(){},
        labelPosition: 'before',
      },data);

      if(data.label && data.labelPosition === 'before') {
        field += selfObj.label(data);
      }

      field += '<input ';
        field += 'id="'+selfObj.formId+'_'+(data.id?selfObj.normalize(data.id):selfObj.normalize(data.name))+'" ';
        field += 'type="'+data.type+'" ';
        field += 'name="'+data.name+'" ';
        field += 'tabindex="1" ';

        if(Object.keys(data.dataAttr).length) {
          for(var a in data.dataAttr) {
            field += 'data-'+a+'="'+data.dataAttr[a]+'" ';
          }
        }

        if(data.value) field += 'value="'+data.value+'" ';
        if(data.checked) field += 'checked="checked" ';
        if(data.required) field += 'required="required" ';
        if(data.max) field += 'max="'+data.max+'" ';
        if(data.min) field += 'min="'+data.min+'" ';
        if(data.step) field += 'step="'+data.step+'" ';
      field += '>';

      if(data.label && data.labelPosition === 'after') {
        field += selfObj.label(data);
      }

      return selfObj.add($.extend(data,{
        field: field,
        class: data.type,
      }));
    };

    this.hidden = function(data) {
      data = $.extend({
        type: 'hidden',
      },data);
      selfObj.text(data);
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
        labelPosition: 'before',
        select: function(){}
      },data);

      if(data.label && data.labelPosition === 'before') {
        field += selfObj.label(data);
      }

      field += '<select ';
        field += 'id="'+selfObj.formId+'_'+data.name+'" ';
        field += 'name="'+data.name+'" ';
        field += 'size="'+data.size+'" ';
        field += 'tabindex="1" ';
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

    this.checkboxes = function(data) {
      var block = '';
      data = $.extend({
        type: 'checkbox',
        value: 1,
        values: [],
        return: true,
        row: 'column',
        labelPosition: 'after',
        select: false
      },data);


      if(data.label) {
        block += selfObj.label(data);
      }

      for(var v in data.values) {
        data.values[v].id = data.name+'_'+v;
        if(data.values[v].value === undefined)
          data.values[v].value = data.values[v].label;
        block += selfObj.text($.extend({},true,data,data.values[v]));
      }

      selfObj.add({
        field: block,
        class: 'checkbox_container'
      });
    };

    this.radio = function(data) {
      var block = '';
      data = $.extend({
        type: 'radio',
        value: 1,
        values: [],
        return: true,
        row: 'column',
        select: false,
        labelPosition: 'after',
      },data);


      if(data.label) {
        block += selfObj.label(data);
      }

      for(var v in data.values) {
        data.values[v].id = data.name+'_'+v;
        if(data.values[v].value === undefined)
          data.values[v].value = data.values[v].label;
        block += selfObj.text($.extend({},true,data,data.values[v]));
      }

      selfObj.add({
        field: block,
        class: 'radio_container'
      });
      
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

    this.addHtml = function(data) {
      data = $.extend({
        content: '',
      },data);

      selfObj.add({
        field: data.content,
        class: 'content'
      });
    };

    this.generate = function(data) {
      var returnValue = '';

      data = $.extend({
        type: 'body',
        method: 'post',
        action: false,
        fieldset: true,
        removeTemp: true,
        class: '',
      },data);

      for(var i in selfObj.form) {
        var className = i.replace(/_suffix-.*/,'');
        returnValue += '<div class="'+className+'">'+"\n";
          returnValue += selfObj.form[i].join("\n");
        returnValue += "\n"+'</div>'+"\n";
      }

      switch(data.type) {
        case 'body': 
        break;
        case 'form':
          var pform = '';

          pform += '<form ';
            if(data.action) pform += 'action="'+data.action+'" ';
            if(data.method) pform += 'method="'+data.method+'" ';
            if(data.class) pform += 'class="'+data.class+'" ';
          pform += '>';
            if(data.fieldset) pform += '<fieldset>';
            if(data.fieldset && data.legend) pform += '<legend>'+data.legend+'</legend>';
            pform += returnValue;
            if(data.fieldset) pform += '</fieldset>';
          pform += '</form>';

          returnValue = pform.replace(' >','>');
        break;
        default:
          returnValue = selfObj.generateForm(data,returnValue,selfObj);
        break;
      }

      if(data.removeTemp) {
        var tForm = [];
        for(var t in selfObj.form) {
          if(t.split('_')[0] !== 'temp')
            tForm[t] = selfObj.form[t];
        }

        selfObj.form = tForm;
      }

      return returnValue;
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
