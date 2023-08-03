"use strict";

let map = L.map("Map").setView([55.41, 10.379], 16);

let tile1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);

let screens = {};
screens["List"] = document.getElementById("List");
screens["New"] = document.getElementById("New");
screens["Show"] = document.getElementById("Show");

let new_lon_val = document.getElementById("NewLonVal");
let new_lat_val = document.getElementById("NewLatVal");
let new_name_val = document.getElementById("NewNameVal");
let new_descr_val = document.getElementById("NewDescrVal");
let new_type_val = document.getElementById("NewTypeVal");

let le_list = document.getElementById("List");
let le_lelist = document.getElementById("LeList");

let activities = {};
let marker_events = [];

let add_activity = document.getElementById("AddActivity");

let tmp_marker;

add_activity.addEventListener("click", NewActivity);
document.addEventListener("keyup", HandleButtonPress);
map.on("click", HandleClick);

ShowScreen("List");

function HandleButtonPress(event)
	{
		if (event.key === "Escape")
			{
				ShowScreen("List");
				RemoveTempMarker()
			}
	}

function HandleClick(event)
	{
		MapClick(event);
	}

function ShowScreen(q)
	{
		for (const [key, value] of Object.entries(screens))
			{
				screens[key].style.display = "none";
			}

		screens[q].style.display = "block";
	}

function MapClick(event)
	{
		RemoveTempMarker();
		let pos = event.latlng;
		tmp_marker = L.marker(pos).addTo(map);
		new_lon_val.value = Math.round(pos.lng * 1000) / 1000;
		new_lat_val.value = Math.round(pos.lat * 1000) / 1000;
		ShowScreen("New");
	}

function RemoveTempMarker()
	{
		if (tmp_marker != undefined)
			{
				map.removeLayer(tmp_marker);
			}
		tmp_marker != undefined;
	}

function ShowMarker(event)
	{
		RemoveTempMarker();
		ShowScreen("List");
	}

function NewActivity()
	{
		if (new_name_val.value != "")
			{
				let unique_key = GetUniqueKey(5);

				let le_activity = {};
				le_activity["NewName"] = new_name_val.value;
				le_activity["NewDescr"] = new_descr_val.value;
				le_activity["NewLon"] = new_lon_val.value;
				le_activity["NewLat"] = new_lat_val.value;
				le_activity["NewType"] = new_type_val.value;
				le_activity["Marker"] = tmp_marker;

				let popup_content =
				`Name:<br>${new_name_val.value}<br><br>
				Description:<br>${new_descr_val.value}<br><br>
				Longitude:<br>${new_lon_val.value}<br><br>
				Latitude:<br>${new_lat_val.value}<br><br>
				Type:<br>${new_type_val.value}<br><br>
				Latitude:<br>${new_lat_val.value}`;

				let new_div = document.createElement("div");
				new_div.classList = "LeLeList";
				new_div.id = unique_key;
				new_div.innerHTML = String(new_name_val.value);
				le_lelist.appendChild(new_div);
				le_lelist.addEventListener("click", HandleListClick);

				marker_events.push(tmp_marker.on("click", ShowMarker));
				tmp_marker.bindPopup(popup_content).openPopup();

				tmp_marker = undefined;
				new_name_val.value = "";
				new_descr_val.value = "";
				new_type_val.value = "";
				activities[unique_key] = le_activity;

				ShowScreen("List");
			}
	}

function HandleListClick(event)
	{
		let list_act = activities[event.target.id];
		map.setView([list_act["Marker"]._latlng.lat, list_act["Marker"]._latlng.lng], 16);
		list_act["Marker"].openPopup();
	}

function GetUniqueKey(num)
	{
		let key_len;
		let characters = "abcdefghijklmnopqrstuvwxyz";
		let c_length = characters.length;
		let result = "";

		while (true)
			{
				key_len = Math.round(Math.max(5, Math.random() * num));
				for (let i = 0; i < key_len; i++)
					{
						result += characters.charAt(Math.round(Math.random() * c_length));
					}

				if (!(activities.hasOwnProperty(result)))
					{
						return result;
					}
			}
	}