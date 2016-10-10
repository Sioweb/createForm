# CreateForm (Alpha)

jQuery Plugin zur Erstellung von Formularen. 

### HowTo

Dieses Beispiel erstellt den Formularinhalt mit drei Blöcken.

	var $createForm = $.createForm()[0].createForm;
	
	$createForm.addBlock({class:'left'});
	
	$createForm.text({required:true,label:'Unternehmen:',name:'company'});
	$createForm.text({required:true,label:'Vorname:',name:'firstname'});
	$createForm.text({required:true,label:'Straße:',name:'street'});
	$createForm.text({required:true,label:'Stadt:',name:'city'});
	$createForm.text({required:true,label:'Telefon:',name:'phone'});
	$createForm.text({required:true,label:'Art der Veranstaltung:',name:'type'});
	$createForm.select({required:true,label:'salutation:',name:'seating',values:{
		'1': 'Woman',
		'2': 'Man'
	}});
	
	$createForm.addBlock({class:'right'});
	$createForm.text({required:true,label:'Anrede:',name:'salutation'});
	$createForm.text({required:true,label:'Nachname:',name:'lastname'});
	$createForm.text({required:true,label:'PLZ:',name:'zip'});
	$createForm.text({required:true,label:'Land:',name:'country'});
	$createForm.email({required:true,label:'E-Mail:',name:'email'});
	$createForm.number({required:true,label:'Alter:',name:'age'});
	
	$createForm.addBlock({class:'bottom'});
	$createForm.checkbox({required:true,label:'Some checkbox stuff',name:'tables'});
	$createForm.textarea({required:true,label:'Anmerkung:',name:'message'});
	
	console.log($createForm.generate());

### Doku
	<script>
	var $createForm = $.createForm()[0].createForm;
	</script>

<table>
	<tr>
		<td valign="top">$createForm.addBlock</td>
		<td valign="top">New DIV-Container</td>
		<td valign="top">
			<ul>
				<li>class: ''</li>
				<li>suffix: ''</li>
				<li>create: function(class_obj){}</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td valign="top"$createForm.text></td>
		<td valign="top">Creates an input field with given Type</td>
		<td valign="top">
			<ul>
				<li>type: 'text'</li>
				<li>value: ''</li>
				<li>required: false</li>
				<li>max: false</li>
				<li>min: false</li>
				<li>step: false</li>
				<li>label: ''</li>
				<li>class: ''</li>
				<li>id: false</li>
				<li>dataAttr: {}</li>
				<li>select: function(){}</li>
				<li>labelPosition: 'before'</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td valign="top">$createForm.hidden</td>
		<td valign="top">Alias for .text</td>
		<td valign="top">
			<ul>
				<li>type: 'hidden'</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td valign="top">$createForm.email</td>
		<td valign="top">Alias for .text</td>
		<td valign="top">
			<ul>
				<li>type: 'email'</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td valign="top">$createForm.number</td>
		<td valign="top">Alias for .text</td>
		<td valign="top">
			<ul>
				<li>type: 'number'</li>
				<li>min: false,</li>
				<li>max: false</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td valign="top">$createForm.select</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.checkbox</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.checkboxes</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.radio</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.textarea</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.addHtml</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.generate</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
	<tr>
		<td valign="top">$createForm.spacer</td>
		<td valign="top"></td>
		<td valign="top"></td>
	</tr>
</table>
