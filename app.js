const {createConnection} = require("mysql2/promise");
const leer = require("prompt-sync")();

/**
 * Inicia el programa
 */
async function main() {
    let opcion = 0;
    const conexionDB = await CreaConexion();
    MostrarPlanilla();
    opcion = leer();
    
    
    
    const respuesta = await conexionDB.query("SELECT * FROM repuestos");
    const respuesta2 = await conexionDB.query("SELECT * FROM repuestos WHERE id = 3")
    console.table(respuesta[0]);
    console.table(respuesta2[0]);
    

    
    await conexionDB.end();
}


main();
/**
 * Muestra la planilla/
*/
function MostrarPlanilla() {
    console.log("Planilla");
    console.log("\t1 - Ver repuestos");
    console.log("\t2 - Ver un repuesto");
}


/**
 * Crea la conexion con la base de datos
 * @returns la conexion con la base de datos
 */
async function CreaConexion() {
    return await createConnection({
        host: "localhost",
        user: "eduardo",
        password: "1234",
        database: "base_de_datos"
    });
}
