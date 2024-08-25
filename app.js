const {createConnection} = require("mysql2/promise");
const leer = require("prompt-sync")();

/**
 * Inicia el programa
 */
async function main() {
    let opcion = 0;
    const conexionDB = await CreaConexion();
    MostrarPlanilla();
    opcion = Number(leer());
        switch (opcion) {
        case 1:
            const infoRepuestos = await conexionDB.query("SELECT * FROM repuestos");
            console.table(infoRepuestos[0]);
            break;
        case 2:
            console.log("Ingrese el id del repuesto que quiere ver");
            const idRepuesto = Number(leer());
            const infoRepuesto = await conexionDB.query("SELECT * FROM repuestos WHERE id = ?", [idRepuesto]);
            console.table(infoRepuesto[0]);
            break;
        default:
            console.log("opcion no reconocida");
                        break;
    }
    
    
    
   
    

    
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
