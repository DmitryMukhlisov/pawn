import { IDefaultEvent } from "./DefaultComplitions";

export let defaultEvents: IDefaultEvent[] = [
	{
		name: "OnGameModeInit",
		description: "Вызывается при запуске игрового мода"
	},
	{
		name: "OnGameModeExit",
		description: "Вызывается при завершении работы игрового мода"
	},
	{
		name: "OnPlayerConnect",
		description: "Вызывается при подключении игрока к серверу",
		args: "playerid",
		wiki: "## Возвращаемое значение:\
		\n- 0 - Останаливает вызовы OnPlayerConnect в других скриптах\
		\n- 1 - Дает возможность обработку вызовов OnPlayerConnect в других скриптах."
	},
	{
		name: "OnFilterScriptInit"
	},
	{
		name: "OnFilterScriptExit"
	},
	{
		name: "OnPlayerDisconnect",
		args: "playerid, reason"
	},
	{
		name: "OnPlayerSpawn",
		args: "playerid"
	},
	{
		name: "OnPlayerDeath",
		args: "playerid, killerid, reason"
	},
	{
		name: "OnVehicleSpawn",
		args: "vehicleid"
	},
	{
		name: "OnVehicleDeath",
		args: "vehicleid, killerid",
	},
	{
		name: "OnPlayerText",
		args: "playerid, text[]"
	},
	{
		name: "OnPlayerCommandText",
		args: "playerid, cmdtext[]"
	},
	{
		name: "OnPlayerRequestClass",
		args: "playerid, classid"
	},
	{
		name: "OnPlayerEnterVehicle",
		args: "playerid, vehicleid, ispassenger"
	},
	{
		name: "OnPlayerExitVehicle",
		args: "playerid, vehicleid"
	},
	{
		name: "OnPlayerStateChange",
		args: "playerid, newstate, oldstate"
	},
	{
		name: "OnPlayerEnterCheckpoint",
		args: "playerid"
	},
	{
		name: "OnPlayerLeaveCheckpoint",
		args: "playerid"
	},
	{
		name: "OnPlayerEnterRaceCheckpoint",
		args: "playerid"
	},
	{
		name: "OnPlayerLeaveRaceCheckpoint",
		args: "playerid"
	},
	{
		name: "OnRconCommand",
		args: "cmd[]"
	},
	{
		name: "OnPlayerRequestSpawn",
		args: "playerid"
	},
	{
		name: "OnObjectMoved",
		args: "objectid"
	},
	{
		name: "OnPlayerObjectMoved",
		args: "playerid, objectid"
	}
// forward OnPlayerPickUpPickup(playerid, pickupid);
// forward OnVehicleMod(playerid, vehicleid, componentid);
// forward OnEnterExitModShop(playerid, enterexit, interiorid);
// forward OnVehiclePaintjob(playerid, vehicleid, paintjobid);
// forward OnVehicleRespray(playerid, vehicleid, color1, color2);
// forward OnVehicleDamageStatusUpdate(vehicleid, playerid);
// forward OnUnoccupiedVehicleUpdate(vehicleid, playerid, passenger_seat, Float:new_x, Float:new_y, Float:new_z, Float:vel_x, Float:vel_y, Float:vel_z);
// forward OnPlayerSelectedMenuRow(playerid, row);
// forward OnPlayerExitedMenu(playerid);
// forward OnPlayerInteriorChange(playerid, newinteriorid, oldinteriorid);
// forward OnPlayerKeyStateChange(playerid, newkeys, oldkeys);
// forward OnRconLoginAttempt( ip[], password[], success );
// forward OnPlayerUpdate(playerid);
// forward OnPlayerStreamIn(playerid, forplayerid);
// forward OnPlayerStreamOut(playerid, forplayerid);
// forward OnVehicleStreamIn(vehicleid, forplayerid);
// forward OnVehicleStreamOut(vehicleid, forplayerid);
// forward OnActorStreamIn(actorid, forplayerid);
// forward OnActorStreamOut(actorid, forplayerid);
// forward OnDialogResponse(playerid, dialogid, response, listitem, inputtext[]);
// forward OnPlayerTakeDamage(playerid, issuerid, Float:amount, weaponid, bodypart);
// forward OnPlayerGiveDamage(playerid, damagedid, Float:amount, weaponid, bodypart);
// forward OnPlayerGiveDamageActor(playerid, damaged_actorid, Float:amount, weaponid, bodypart);
// forward OnPlayerClickMap(playerid, Float:fX, Float:fY, Float:fZ);
// forward OnPlayerClickTextDraw(playerid, Text:clickedid);
// forward OnPlayerClickPlayerTextDraw(playerid, PlayerText:playertextid);
// forward OnIncomingConnection(playerid, ip_address[], port);
// forward OnTrailerUpdate(playerid, vehicleid);
// forward OnVehicleSirenStateChange(playerid, vehicleid, newstate);
];
