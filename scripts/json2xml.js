function JSONtoXML(object) {
	var prevName = '', prevObj = '', namePrevObj = '', name = '', xml = '';
	for (var prop in object) {
		if (object.hasOwnProperty(prop)) {
			prevName = object.name;
			prevObj = typeof object;
			namePrevObj = prop;
			if (typeof object[prop] === 'object' && prop === 'value') {
				xml = xml + '>\n' + JSONtoXML(object[prop]) + '</' + prevName + '>';
			}
			else if (typeof object[prop] === 'object'){
				xml += JSONtoXML(object[prop]);
			}
			else {
				if (prop === 'name') {
					name = object[prop];
					xml += '<' + name;
				}
				else if (prop === 'version') {
					xml += ' version="' + object[prop] + '">\n<parameters>\n';
				}
				else if (prop === 'value') {
					xml += '>' + object[prop] + '</' + name + '>\n';
				}
				else {
					xml += ' ' + prop + '="' + object[prop] + '"';
				}
			}
		}
	}
	return xml;
};
	
function createXML(object) {
	var x = JSONtoXML(object);
	return '<?xml version="1.0"?>\n' + x + '\n</parameters>\n</' + configuration.get('name') + '>';
};