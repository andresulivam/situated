/* --------------------------------------- CREATING ELEMENTS ----------------------------------------------- */

	/* Criando nova DIV */
	function createNewDiv(iddiv, draggable, ondragstart, classname, innerhtml, datatoggle, hidden){
		var newdiv = document.createElement('div');
		if(iddiv != null){
			newdiv.id = iddiv;
		}
		if(draggable != null){
			newdiv.draggable = draggable;
		}
		if(ondragstart != null){
			newdiv.ondragstart = ondragstart;
		}
		if(classname != null){
			newdiv.className = classname;
		}
		if(innerhtml != null){
			newdiv.innerHTML = innerhtml;
		}
		if(datatoggle != null){
			newdiv.setAttribute('data-toggle', datatoggle);
		}
		if(hidden != null){
			newdiv.hidden = hidden;
		}
		return newdiv;
	}

	/* Criando novo LABEL */
	function createNewLabel(id, innerhtml, hidden, draggable, ondragstart, classname){
		var newlabel = document.createElement('label');
		if(innerhtml != null){
			newlabel.innerHTML = innerhtml;
		}
		if(id != null){
			newlabel.id = id;
		}
		if(draggable != null){
			newlabel.draggable = draggable;
		}
		if(ondragstart != null){
			newlabel.ondragstart = ondragstart;
		}
		if(classname != null){
			newlabel.className = classname;
		}
		if(hidden != null){
			newlabel.hidden = hidden;
		}
		return newlabel;
	}

	/* Criando novo INPUT */
	function createNewInput(id, type, classname, hidden, oninput){
		var newinput = document.createElement('input');
		if(id != null){
			newinput.id = id;
		}
		if(type != null){
			newinput.type = type;
		}
		if(classname != null){
			newinput.className = classname;
		}
		if(oninput != null){
			newinput.oninput = oninput;
		}
		if(hidden != null){
			newinput.hidden = true;
		}
		return newinput;
	}

	/* Criando novo A */
	function createNewA(id, classname, onclick, datatoggle, href, textcontent){
		var newa = document.createElement('a');
		if(id != null){
			newa.id = id;
		}
		if(classname != null){
			newa.className = classname;
		}
		if(onclick != null){
			newa.onclick = onclick;
		}
		if(datatoggle != null){
			newa.setAttribute('data-toggle', datatoggle);
		}
		if(href != null){
			newa.href = '#'+href;
		}
		if(textcontent != null){
			newa.textContent = textcontent;
		}
		return newa;
	}

	/* Criando novo IMG */
	function createNewImg(id, src, alt, title, classname){
		var newimg = document.createElement('img');
		if(id != null){
			newimg.id = id;
		}
		if(src != null){
			newimg.src = src;
		}
		if(alt != null){
			newimg.alt = alt;
		}
		if(title != null){
			newimg.title = title;
		}
		if(classname != null){
			newimg.className = classname;
		}
		return newimg;
	}

	/* Criando novo OPTION */
	function createNewOption(value, text, classname, selected){
		var option = document.createElement('option');
		if(value != null){
			option.value = value;
		}
		if(text != null){
			option.text = text;
		}
		if(classname != null){
			option.className = classname;
		}
		if(selected != null){
			option.selected = selected;
		}
		return option;			
	}

	/* Criando novo H4 */
	function createNewH4(classname){
		var h4 = document.createElement('h4');
		if(classname != null){
			h4.className = classname;
		}
		return h4;			
	}

	/* Criando novo SCRIPT */
	function createNewScript(textcontent){
		var script = document.createElement('script');
		if(textcontent != null){
			script.text = textcontent;
		}
		return script;			
	}

	/* Criando novo SELECT */
	function createNewSelect(id, classname){
		var select = document.createElement('select');
		if(id != null){
			select.id = id;
		}
		if(classname != null){
			select.className = classname;
		}
		return select;			
	}

	/* Criando novo BUTTON */
	function createNewButton(id, type, classname, innerhtml){
		var button = document.createElement('button');
		if(id != null){
			button.id = id;
		}
		if(type != null){
			button.type = type;
		}
		if(classname != null){
			button.className = classname;
		}
		if(innerhtml != null){
			button.innerHTML = innerhtml;
		}
		return button;			
	}

	/* Criando novo Datalist */
	function createNewDataList(arrayoptions, id){
		var datalist = document.createElement('datalist');
		var option;
		for(var i=0; i < arrayoptions.length; i++){
			option =  document.createElement('option');
			option.value = arrayoptions[i].value;
			datalist.appendChild(option);
		}
		if(id != null){
			datalist.id = id;
		}
		return datalist;
	}
/* --------------------------------------------------------------------------------------------------------- */
