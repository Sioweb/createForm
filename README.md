# createForm
Create a simple Form

### HowTo

Dieses Beispiel erstellt den Formularinhalt mit drei Blöcken.

```
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
