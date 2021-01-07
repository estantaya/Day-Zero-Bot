/*

Day Zero Bot Creado por Death Gun#3137 fb.com/estantaya para Day Zero Rust Legacy
Oficial Discord: https://discord.gg/uVu8xWsx5m

*/
const Url = require('url');

const http = require('http');

var ping;
		//console.log("!");
/*
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(cfgData.alias.data.comandos.test);
});

let body = [];
request.on('data', (chunk) => {
  body.push(chunk);
}).on('end', () => {
  body = Buffer.concat(body).toString();
  // at this point, `body` has the entire request body stored in it as a string
});

server.on('request', (request, response) => {
  // the same kind of magic happens here!
  console.log(request);
});
server.listen(port, hostname, () => {
  console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});
*/

const spawn = require('child_process').spawn;
const Discord = require('discord.js');
//const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');


var online=false;

var cfgDayZero = "../serverdata/oxide/data/DayZero.json";
//ipc.stdin.write(JSON.stringify(message) + "\n");

//var 


var jugadoresEmbed = new Discord.MessageEmbed()
  // Set the title of the field
  .setTitle("Jugadores Online")
  // Set the color of the embed
  .setColor("ORANGE");

var jugadores={};

var nuevaData="";

var start=true;

//canales se accede a sus nombres de discord con cfgData.canales.data.list
var canales = {
	"Registro":null,//para usuarios, nombre: (cfgData.online.data.canal)
	"OnOff":null,//para usuarios, nombre: (cfgData.online.data.canal)
	"Spam":null,//para usuarios, nombre: (cfgData.online.data.canal)
	"Vip":null,//para vips, nombre: cfgData.
	"serverLog":null//para admins, nombre: (cfgData.server.data.canal)
};

var serverParams=ToArgs('-batchmode -ip 0.0.0.0 -port 28015 -maxplayers 80 -hostname "dayzero"');

var msgEntrada=[" Esta entre nosotres"," hiso acto de presencia"," vino",
" se levanto de entre los muertos"," resucito"," quiere pan"," llegó"," volvió",
" ha regresado"," siempre esta de vuelta"," nos extrañaba"," quiere jugar pvp arena",
" quiere farmear osos"," vino a raidear"," vino a farmear"," lo corrio la mujer"];
var msgSalida=[" Se evaporo"," Se fué"," desapareció",
" Murio de regreso a su planeta"," ya no esta entre nosotros"," se fue a hacer caca",
" esta con dios"," fue funado"," le dio sueño"," lo llamo la mama",
" se fue a trabajar"," se fue a estudiar"," se fue al baño"," se despide de este mundo cruel"];

var imagenes=[];

http.createServer((request, response) => {
	
  const { headers, method, url } = request;
  let body = [];
  
  response.on('close', () => {
    ping=null;
  }).on('finish', () => {
    ping=null;
  });
  
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
	console.log("el plugin esta enviando data...");
  }).on('end', () => {
	  
	  
	  
    body = Buffer.concat(body).toString();
	
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
	
	//console.log(body);
	//console.log(headers);
	//console.log(method);
	/*response.write("1");
	response.write("2");*/
	
	//console.log("el plugin envio algo...");
	
	var query = Url.parse(url, true).query;
	
	//if (url=="/discord/") response.end("https://discord.gg/AUHY76mXWx")
	
	//console.log("query: "+query);
	/*if (canales["serverLog"]!=null) {
		canales["serverLog"].send(url);
	}*/
		/*if (ping==null) ping=response;
		else if (ping.) ping=response;*/
	
	if ("ping" in query) {
		//console.log("Server Alive");
		if (ping!=null) ping.end();
		ping=response;
		if (start) {
			start=false;
			if (canales["serverLog"]!=null) canales["serverLog"].send("El plugin se conecto!");
			ping.end("{'update_players':''}");
		}
		return;
	}
	
		/*
		if (ping!=null) {
			ping.end();
		}
		ping=response;
		*/
//	else if (ping == null) ping = response;
	
	if ("echo" in query) {
		if (query["echo"] in canales) {
			canales[query["echo"]].send(decodeURIComponent(query["content"]));
		} else if (canales["serverLog"]!=null) {
			canales["serverLog"].send("El bot intento enviar\n`"+
			decodeURIComponent(query["content"])+"`\n a "+query["spam"]+
			" pero ese canal no existe...");
		}
	} else if ("startServer" in query) {
		if (canales["Spam"]!=null) {
			canales["Spam"].send("<:rust:772875920406478868> El server abrio!");
		}
		jugadores={};
	} else if ("closeServer" in query) {
		jugadores={};
		console.log("El servidor cerro");
		if (canales["Spam"]!=null) {
			canales["Spam"].send("<:rust:772875920406478868> El server cerro!");
			ping=null;
		}
	} else if ("playersOn" in query) {
		jugadores={};
		var listaJugadores=[];
		listaJugadores=decodeURIComponent(query["playersOn"]).split(", ");
		//listaJugadores=query["playersOn"].split(",%20");
		for (i=0;i<listaJugadores.length;i++) {
			jugadores[listaJugadores[i]]=true;
		}
		/*if (canales["Spam"]!=null) {
			SendOnline(canalSpam,"global");
		}*/
	} else if ("playerOn" in query) {
		jugadores[query["playerOn"]]=true;
		console.log(query["playerOn"]+" se conecto");
		if (canales["OnOff"]!=null) {
			canales["OnOff"].send(query["playerOn"]+msgEntrada[Math.floor(Math.random()*msgEntrada.length)]);
		}
	} else if ("playerOff" in query) {
		jugadores[query["playerOff"]]=false;
		console.log(query["playerOff"]+" se desconecto");
		if (canales["OnOff"]!=null) {
			canales["OnOff"].send(query["playerOff"]+msgSalida[Math.floor(Math.random()*msgSalida.length)]);
		}
	} else if ("raid" in query) {
		//var coords=query["raid"].split(",");
		console.log("c4log");
		//console.log(query["playerOn"]+" se desconecto");
		if (canales["Raid"]!=null) canales["Raid"].send(query["player"]+" Esta raideando la casa de "+query["victim"]);
	} else if ("ganadorArena" in query) {
		if (canales["Spam"]!=null) canales["Spam"].send("[ArenaMiniGames] "+query["ganadorArena"]+" es el ganador!!!");
	}
		response.end("ok");
	
  });
}).listen(3000); // Activates this server, listening on port 8080.

var cfgData = {
	
	ayuda : {
		call : function(msg,args) {
			MostrarComandos(msg);
		},
		data : {
			a:"h","help":"Mostrar comandos"
		}
	},
	canal : {
		call : function(msg,args) {
			if (args.length==1) {
				var canalesBot="";
				for (var key in cfgData.canal.data.list) {
					canalesBot+=key+"\n";
				}
				msg.channel.send("Subcomandos:\n"+canalesBot+"Ejemplo: "+
				cfgData.prefijo.data.name+"canal bienvenida");
			} else if (args[1] in cfgData.canal.data.list) {
				//canales[args[1]]=;
				if (cfgData.canal.data.list[args[1]]==msg.channel.id) {
					cfgData.canal.data.list[args[1]]="";
					canales[args[1]]=null;
					msg.channel.send("Se borro este canal del bot");
				} else {
					cfgData.canal.data.list[args[1]]=msg.channel.id;
					canales[args[1]]=msg.channel;
					msg.channel.send("Se establecio este canal como canal "+args[1]);
				}
				SaveData();
			} else msg.channel.send("?");
		},
		data : {
			a:"sc",
			"admin_help":"Elije un canal para que el bot diga cosas",
			list:{
				Bienvenida:"✔lobby︻╦╤─",Spam:"",Registro:"",OnOff:"",Raid:"",Vip:"",serverLog:"♛staff♛"
			}
		}
	},
	
	id_jugador : {
		call : function(msg,args) {
			if (ping==null) {
				if (start) msg.channel.send("El server se apago...");
				else msg.channel.send("El server esta offline");
				return;
			}
			if (CheckAdmin(msg.member)) {
				if (args.length==1) {
					msg.channel.send("Falta el nombre del jugador");
				} else if (ping != null) {
					ping.end(JSON.stringify({"id_from_name":encodeURI(args[1])}));
					
					//ping = null;
					//msg.channel.send("Enviando query...");
				} else msg.channel.send("El plugin no esta conectado...");
			} else msg.reply("No tienes permiso");
		},
		data : {a:"id","admin_help":"Obtener Id de un Jugador"}
	},
	prefijo : {
		call : function(msg,args) {
			
			if (CheckAdmin(msg.member)) {
				if (args.length==1) {
					cfgData.prefijo.data.name = "";
					msg.channel.send("Se elimino el prefijo");
				} else {
					cfgData.prefijo.data.name = args[1];
					msg.channel.send("El nuevo prefijo es "+args[1]);
				}
				SaveData();
			} else msg.reply("No tienes permiso");
		},
		data : {a:"p","admin_help":"Prefijo para comandos",name:"dz!"}
	},
	
	server : {
		call : function(msg,args) {
			if (ping==null) {
				if (start) msg.channel.send("El server se apago...");
				else msg.channel.send("El server esta offline");
				return;
			}
			if (!CheckAdmin(msg.member)) {
				msg.channel.send("No tienes permiso");
				return;
			}
			if (args.length==1) {
				msg.channel.send("Subcomandos:\n`"+
				cfgData.server.data.prender+"`: Prender el server\n`"+
				cfgData.server.data.say+"`: Hablar en el servidor");
			} else if (args.length==2) {
				msg.channel.send("Falta valor del subcomando");
			} else if (cfgData.server.data.prender.indexOf(args[1])!=-1) {
				//serverLog=msg.channel;
				msg.channel.send("Iniciando servidor...");
				PrenderServer();
			} else if (cfgData.server.data.say.indexOf(args[1])!=-1) {
				
				if (ping==null) {
					msg.channel.send("Plugin desconectado...");
					return;
				}
				if (args.length>2) {
					//if (ping!=null) {
					ping.end(JSON.stringify({"botSay":args[2]}));
					/*} else {
						msg.channel.send("Error, no conectado...");
					}*/
					msg.channel.send("Mensaje enviado...");
					console.log("enviando botSay: "+args[2]);
				} else msg.channel.send("Error, ejemplo: "+
				cfgData.prefijo.data.name+'server say "Hola mundo"');
				
				//SaveData();
			} else {
				msg.channel.send("Subcomando "+args[2]+" erroneo");
			}
		},
		data : {
			a:"s","admin_help":"Prender y Hablar en el server",
			prender : ["prender","p"], say : ["say","s"]
		}
	},
	
	online : {
		call : function(msg,args) {
			if (ping==null) {
				if (start) msg.channel.send("El server se apago...");
				else msg.channel.send("El server esta offline");
				return;
			}
			SendOnline(msg.channel,"global");
		},
		data : {
			a:"on",
			"help":"Muestra Jugadores Conectados"
		}
	},
	
	msg : {
		call : function(msg,args) {
			
			if (args.length>1) {
				if (CheckAdmin(msg.member)) {
					var index=imagenes.indexOf(args[1]);
					if (index==-1) {
						imagenes.push(args[1]);
						nuevaData="Mensaje ingresado";
					} else {
						imagenes.slice(index,1);
						nuevaData="Mensaje eliminado";
					}
					//✔lobby︻╦╤─
					SaveImages();
				} else nuevaData="No tienes permiso";
			} else {
				//console.log("imagenes: "+imagenes.length);
				if (imagenes.length>0) nuevaData=imagenes[Math.floor(Math.random()*imagenes.length)];
				else nuevaData = "No hay mensajes";
			}
			msg.channel.send(nuevaData);
		},
		data : {a:"r","help":"Muestra mensajes random",
		"admin_help":"[ Guarda un mensaje]"}
	},
	
	msg_bienvenida : {
		call : function(msg,args) {
			if (CheckAdmin(msg.member)) {
				if (args.length>1) {
					cfgData.msg_bienvenida.data.canal = args[1];
					nuevaData="Mensaje modificado";
					SaveData();
				} else {
					BroadcastWelcome(msg.member);
					//nuevaData="El mensaje de bienvenida es: "+cfgData.msg_bienvenida.data.msg;
					nuevaData="Ejemplo: "+cfgData.prefijo.data.name+'msg_bienvenida "Mensaje de ejemplo';
				}
				msg.channel.send(nuevaData);
			} else msg.reply("No tienes permiso");
		},
		data : {a:"mb","admin_help":"Mensaje de bienvenida al servidor",
		msg:"UNA LEYENDA HA NACIDO EN :beginner:𝔻𝔸𝕐ℤ𝔼ℝ𝕆:beginner:︻╦╤─"}
	},
	
	img_bienvenida : {
		call : function(msg,args) {
			if (CheckAdmin(msg.member)) {
				if (args.length>1) {
					cfgData.img_bienvenida.data.img = args[1];
					nuevaData="Imagen modificada";
					SaveData();
				} else {
					nuevaData="La imagen de bienvenida es: "+cfgData.img_bienvenida.data.img;
					nuevaData+="\nModificar: "+cfgData.prefijo.data.name+'img_bienvenida https://imagen';
				}
				msg.channel.send(nuevaData);
			} else msg.reply("No tienes permiso");
		},
		data : {a:"ib","admin_help":"Imagen de bienvenida",img:""}
	},
	
	dm_bienvenida : {
		call : function(msg,args) {
			
			if (CheckAdmin(msg.member)) {
				/*if (args.length==1) SendWelcome(msg.member);
				else {*/
				if (args.length==1) {
					
					msg.channel.send("Modo de uso: "+cfgData.prefijo.data.name+'b[ t "Titulo"][ d "Contenido"][ c color]');//.then(
					/*.then(
					SendWelcome(msg.member));*/
					//var timeOut = setTimeout(SendWelcome,1000,msg.member.user);
					//SaveData();
					//}
					var timeOut = setTimeout(SendWelcome,1000,msg.member.user);
					return;
				}
				var index=args.indexOf("t");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.title = args[index+1];
				index=args.indexOf("title");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.title = args[index+1];
				index=args.indexOf("d");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.desc = args[index+1];
				index=args.indexOf("desc");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.desc = args[index+1];
				index=args.indexOf("c");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.color = args[index+1];
				index=args.indexOf("color");
				if (index!=-1&&args.length>=index+2) cfgData.dm_bienvenida.data.color = args[index+1];
				
					SaveData();
				
			} else msg.reply("No tienes permiso");
		},
		data : {
			a:"b",
			"admin_help":"Mensaje privado al entrar al server",
			title:"Day Zero Rust Legacy Server",
			color:"ORANGE",
			desc:'Hola! Bienvenido... mi nombre es Olimpicus '+
			'y soy parte del STAFF de este proyecto de rust legacy '+
			'"GLORIA AL LEGACY!" no dejemos que muera en su totalidad '+
			'y ayúdanos a crecer compartiendo el enlace del servidor para '+
			'que muchas mas LEYENDAS se unan y seamos una familia grande :) '+
			'GRACIAS por tu ayuda! <3'
		}
	},
	
	//variables : {"gente_online"},
	
	alias : {
		call : function(msg,args) {
			
			if (args.length==1) MostrarAliases(msg);
			else if (CheckAdmin(msg.member)) {
				if (args.length==2) {
					delete cfgData.alias.data.comandos[args[1]];
					SaveData();
				} else if (args.length==3) {
					cfgData.alias.data.comandos[args[1]] = args[2];
					SaveData();
				} else msg.reply("Si el valor del alias tiene espacios inicia el mensaje con \"");
			} else msg.reply("No tienes permiso");
		},
		data : {
			a:"a",
			"help":"Comandos alias",
			comandos: {
				"ip":'net.connect dayzero.latinserver.online:28015'
			}
		}
	},
	say : {
		call : function(msg,args) {
			if (CheckAdmin(msg.member)) {
				if (args.length>1) {
					msg.channel.send(GenerarEmbed(args))
					.then(message => console.log(`Say embed: ${message.content}`))
					.catch(console.error);
				} else {
					msg.channel.send("Faltan parametros... Ejemplo:\n"+
					cfgData.prefijo.data.name+'say "Soy un mensaje"[ "Titulo"[ "url.imagen.jpg"]]');
				}
			} else msg.reply("No tienes permiso");
		},
		data : {
			a:"d",
			"admin_help":"Hacer que el bot diga algo"
		}
	}
};

client.on('ready', () => {
	
	console.log(`Logged in as ${client.user.tag}!`);

	fs.readFile('./imagenes.txt', function(err, data) {
	  if (err) {
		if (err.code === 'ENOENT') {
		  console.error('file does not exist');
		  return;
		}
		throw err;//otro error que no es el archivo no existe
	  }
		//se ejecuta si el archivo existe, creo?
		//header=LeerHeader(Buffer.from(data,"hex"));
		//var 
		imagenes = (""+data).split("\n");
		
		/*dm_bienvenida=cfgData.dm_bienvenida.data;
		aliases=cfgData.alias.dataes;*/
	});
	
	fs.readFile('./data.json', function(err, data) {
		  if (err) {
			if (err.code === 'ENOENT') {
			  console.error('file does not exist');
			  return;
			}
			throw err;//otro error que no es el archivo no existe
		  }
		//se ejecuta si el archivo existe, creo?
		//header=LeerHeader(Buffer.from(data,"hex"));
		//var 
		var newData = JSON.parse(data);
		
		//console.log(newData);
		
		//update from newData
		//cfgData = JSON.parse(data); cause versioning bugs
		
		//unused keys off newData are droped on writeFile
		for (var key in cfgData) {
			if (key in newData) {
				for (var d in cfgData[key].data) {
					if (d in newData[key]) cfgData[key].data[d] = newData[key][d];
				}
			}
		}
		for (var id in cfgData.canal.data.list) {
			if (cfgData.canal.data.list[id]!="") canales[id] = client.channels.cache.find(channel => channel.id == cfgData.canal.data.list[id]);
		}
	});
	/*
	if (cfgData.server.data.canal!="") {
		serverLog=client.channels.cache.find(channel => channel.name == cfgData.server.data.canal);
		if (canales["serverLog"]!=null) canales["serverLog"].send("El bot cobro vida propia...");
	}
	if (cfgData.online.data.canal!="") canalSpam=client.channels.cache.find(channel => channel.name == cfgData.online.data.canal);
	if (cfgData.vip.data.canal!="") canalVip=client.channels.cache.find(channel => channel.name == cfgData.vip.data.canal);
		console.log("ServerLog: "+cfgData.server.data.canal);
		
		
	*/
	/*dm_bienvenida=cfgData.dm_bienvenida.data;
		aliases=cfgData.alias.dataes;*/
	//console.log(cfgData);
	
	//if (canales["serverLog"]!=null) canales["serverLog"].send("Iniciando...");
	//else console.log("Canal de logs de server: "+cfgData.server.data.canal);
	/*
	if (CheckCommand(args[0],"ayuda")) {
		
	} else if (CheckCommand(args[0],"online")) {
		
	} else if (CheckCommand(args[0],"prefijo")) {
		
	} else if (CheckCommand(args[0],"imagen_random")) {
		
	} else if (CheckCommand(args[0],"canal_bienvenida")) {
		
	} else if (CheckCommand(args[0],"img_bienvenida")) {
		
	} else if (CheckCommand(args[0],"msg_bienvenida")) {
		
	} else if (CheckCommand(args[0],"dm_bienvenida")) {
		
	} else if (CheckCommand(args[0],"alias")) {
		
	} else if (args[0] in cfgData.alias.data.comandos) {
		msg.channel.send(cfgData.alias.data.comandos[args[0]]);
	}*/
});

client.on('message', msg => {
	
	if (msg.author.bot) return;
		//console.log(msg.content);
	
	var args = ToArgs(msg.content);
	nuevaData="error";
	
	if (args.length==0) return;//alguien pudo escribir ""
	
	//var arg=args[0];
	//if (arg.startsWith(cfgData.prefijo.data.name)) arg.replace(cfgData.prefijo.data.name,"");
	var arg = SearchCommand(args[0]);
		//console.log(arg);
	if (arg != false) {
		cfgData[arg].call(msg,args);
	} else if (args[0] in cfgData.alias.data.comandos) msg.channel.send(cfgData.alias.data.comandos[args[0]]);
	
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
	
	console.log("Nuevo miembro: "+member.user.username);
  // Send the message to a designated channel on a server:
  //const channel = member.guild.channels.cache.find(ch => ch.name.includes(cfgData.canal_bienvenida.data.canal));
  //const channel = client.channels.cache.get(cfgData.canal_bienvenida.data.canal);
  // Do nothing if the channel wasn't found on this server
  //if (!channel) return;
  // Send the message, mentioning the member
  //channel.send(cfgData.msg_bienvenida.data.msg+", "+member.user.username);
  BroadcastWelcome(member);
  
  var timeOut = setTimeout(SendWelcome,1000,member.user);
  
});

function GenerarEmbed(args) {
  
  var title="DayZero";
  
  if (args.length>2) title=args[2];
  
  var embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle(title)
      // Set the color of the embed
      .setColor("ORANGE")
      // Set the main content of the embed
      .setDescription(args[1]);
    // Send the embed to the same channel as the message
	//const dmChannel = member.createDM();
if (args.length>3) embed.setImage(args[3]);
  
  return embed;
}

function PrenderServer() {
	var ipc = spawn("../rust_server.exe",serverParams,
		{cw:"C:/Users/Administrador/Desktop/rust Dayzero/",env:process.env}
	);
	
	//var ipc = spawn("../Abrir server.bat");

	//ipc.stdin.setEncoding("utf8");

	ipc.stderr.on('data', function (data) {
		//process.stdout.write(data.toString());
		if (canales["serverLog"] != null) canales["serverLog"].send(data.toString());
	});

	ipc.stdout.on('data', function (data) {
		//process.stdout.write(data.toString());
		if (canales["serverLog"] != null) canales["serverLog"].send(data.toString());
	});
	
	ipc.on('close', (code) => {
	  console.log(`Server se apago ${code}`);
	  if (canales["serverLog"] != null) canales["serverLog"].send("El server se apago...");
	});
}

function SaveImages() {
	fs.writeFile('./imagenes.txt', imagenes.join("\n"), function (err) {
		if (err) {
			if (err.code === 'ENOENT') {
			  console.error('file does not exist');
			  return;
			}
			throw err;//otro error que no es el archivo no existe
		}
	});
}

function SaveData() {
	
	var newData={};
	
	for (var key in cfgData) {
		newData[key]=cfgData[key].data;
	}
	
	fs.writeFile('./data.json', JSON.stringify(newData,null,"\t"), function (err) {
		if (err) {
			if (err.code === 'ENOENT') {
			  console.error('file does not exist');
			  return;
			}
			throw err;//otro error que no es el archivo no existe
		}
	});
	
}

function ToArgs(str) {
	
	var strings = str.split('"');
	var args = [];//asegurarme que 
	var string = false;
	for (i=0;i<strings.length;i++) {
		if (!string) args = args.concat(strings[i].toLowerCase().split(" "));
		else args = args.concat(strings[i]);
		string = !string;
	}
	for (i=0;i<args.length;i++) {
		if (args[i]=="") {
			args.splice(i,1);
			i--;
		   }
	}
	
	return args;
	
}

function CheckAdmin(member) {
	//if (member.roles.highest.position==0||member.hasPermission("ADMINISTRATOR")) return true;
	if (member.hasPermission("ADMINISTRATOR")) return true;
	else return false;
}

function MostrarAliases(msg) {
  
  var alias = "";
  for (const key in cfgData.alias.data.comandos) {
	alias += key+"\n";
  }
  const embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle("Comandos Alias")
      // Set the color of the embed
      .setColor("ORANGE")
      // Set the main content of the embed
      .setDescription(alias);
	
  if (CheckAdmin(msg.member)) {
	  embed.addField('Modo de uso',cfgData.prefijo.data.name+'alias [comando ["valor"]]');
		embed.addField('Crear/Editar comando "wipe"',cfgData.prefijo.data.name+'alias wipe "Proximo wipe: 1/1/21\\nNueva linea"');
		embed.addField('Eliminar comando "wipe"',cfgData.prefijo.data.name+'alias wipe');
  }
	embed.setFooter('Metodo abreviado: '+cfgData.prefijo.data.name+'a');
	msg.channel.send(embed);
	
}

function MostrarComandos(msg) {
  /*var comandos = "";
  for (const key in cfgData) {
	comandos+=key+"\n";
  }*/
  const embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle("Comandos")
      // Set the color of the embed
      .setColor("ORANGE")
      // Set the main content of the embed
      .setDescription("Prefijo actual: "+cfgData.prefijo.data.name);
	var admin=CheckAdmin(msg.member);
var helpText;
  for (const key in cfgData) {
	  helpText="";
	  if ("help" in cfgData[key].data) helpText=cfgData[key].data.help;
		if ("admin_help" in cfgData[key].data) {
			if (helpText=="") helpText=cfgData[key].data.admin_help
			else helpText+="\n"+cfgData[key].data.admin_help
		}
		//if ("help" in cfgData[key].data) embed.addField("["+key+", "+cfgData[key].data.a+"]",cfgData[key].data.help);
	if (helpText!="") embed.addField("["+key+", "+cfgData[key].data.a+"]",helpText);
  }
	//embed.setFooter('Metodo abreviado: '+cfgData.prefijo.data.valor+'h');
	//msg.channel.send(embed);
	msg.channel.send(embed);
}

function SearchCommand(arg) {
	//buena function :)
	//var command="";
	//if (cmd in cfgData) command=cfgData[cmd].data.a;
	//if (arg in cfgData) return true;
	for (var key in cfgData) {
		if (cfgData.prefijo.data.name+key == arg) return key;
		if (cfgData.prefijo.data.name+cfgData[key].data.a == arg) return key;
	}
	//if (arg == cfgData.prefijo.data.name+command && command!="" || arg == cfgData.prefijo.data.name+cmd) return true;
	return false;
}

function JugadoresOnline() {
	var num=0;
	for (var key in jugadores) {
		if (jugadores[key]) num++;
	}
	return num;
}

function BroadcastWelcome(member) {
	//var channel = member.guild.channels.cache.find(ch => ch.name.includes(cfgData.canal_bienvenida.data.canal));
  //const channel = client.channels.cache.get(cfgData.canal_bienvenida.data.canal);
  // Do nothing if the channel wasn't found on this server
  if (canales["Bienvenida"]==null) return;
	var embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle(cfgData.msg_bienvenida.data.msg)
      // Set the color of the embed
      .setColor("ORANGE")
      // Set the main content of the embed
      .setDescription(`${member.user}`);
	
	if (cfgData.img_bienvenida.data.img!="") embed.setImage(cfgData.img_bienvenida.data.img);
	//if (cfgData.img_bienvenida.data.img!="") embed.setImage(cfgData.img_bienvenida.data.img+"?s="+encodeURI(member.user.username)+"&"+Math.random());
  canales["Bienvenida"].send(embed)
  .then(message => console.log(`Nuevo user: ${member.user.username}`))
  .catch(console.error);
}

function SendWelcome(user) {
  
  var embed = new Discord.MessageEmbed()
      // Set the title of the field
      .setTitle(cfgData.dm_bienvenida.data.title)
      // Set the color of the embed
      .setColor(cfgData.dm_bienvenida.data.color)
      // Set the main content of the embed
      .setDescription(cfgData.dm_bienvenida.data.desc);
    // Send the embed to the same channel as the message
	//const dmChannel = member.createDM();
  
  //if (!dmChannel) return;
  
		//dmChannel.send(embed);
		//member.user.send(embed);
		user.send(embed)
  .then(message => console.log(`Enviado pm`))
  .catch(console.error);
  //member.send
}
/*
function SpamearCanal(jugador) {
	canalDeSpam.send(jugador.name+" Entro al server.");
}*/

function SendOnline(channel,tipo) {
	
	//var channel = member.guild.channels.cache.find(ch => ch.name.includes(cfgData.canal_bienvenida.data.canal));
  var onlines="";
  var cantidad=0;
  for (var key in jugadores) {
	  if (jugadores[key]) {
		  onlines+=key+"\n";
		  cantidad++;
	  }
  }
  
  onlines+="<:rust:772875920406478868> "+cantidad+" Conectados.";
      // Set the main content of the embed
  jugadoresEmbed.setDescription(onlines);
  
  //jugadoresEmbed.setTitle("");
  //2222dddd sa
  /*if (nuevaData!="") {
	  jugadoresEmbed.setTitle(nuevaData);
  } else jugadoresEmbed.setTitle("Jugadores Online");*/
  
   //embed.addField
    // Send the embed to the same channel as the message
	//const dmChannel = member.createDM();
  
  channel.send(jugadoresEmbed);
}
client.login('change_me');
