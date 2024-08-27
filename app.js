const {createConnection} = require("mysql2/promise");
const leer = require("prompt-sync")();

const OPC_SALIR = 0;
const OPC_VER_REPUESTOS = 1;
const OPC_VER_REPUESTO = 2;
const OPC_ELIMINAR_REPUESTO = 3;
const OPC_AGREGAR_REPUESTO = 4;

/**
 * Inicia el programa
 */
async function main() {
    let opcion = OPC_SALIR;
    const conexionDB = await CreaConexion();

    do {
        MostrarPlanilla();
        opcion = Number(leer());
        console.log("opcion ingresada "+ isNaN(opcion) +" " + opcion);
        
        await ejecutarOpcion(opcion, conexionDB);
    } while (opcion || isNaN(opcion));

    await conexionDB.end();
}


main();

/**
 * Ejecuta la opcion ingresada por el usuario
 * @param {Number} opcion ingresada por el usuario
 * @param {Object} conexionDB creada para usar la base de datos
 */

async function ejecutarOpcion(opcion, conexionDB) {
    switch (opcion) {
        case OPC_VER_REPUESTOS:
            const infoRepuestos = await conexionDB.query("SELECT * FROM repuestos");
            console.table(infoRepuestos[0]);
            break;
        case OPC_VER_REPUESTO:
            console.log("Ingrese el id del repuesto que quiere ver");
            const idRepuesto = Number(leer());
            const infoRepuesto = await conexionDB.query("SELECT * FROM repuestos WHERE id = ?", [idRepuesto]);
            console.table(infoRepuesto[0]);
            break;
        case OPC_ELIMINAR_REPUESTO:
            console.log("Ingrese el id del repuesto que quiere eliminar");
            const idRepuestoEliminar = Number(leer());
            const infoRepuestoEliminar = await conexionDB.query("DELETE FROM repuestos WHERE id = ?", [idRepuestoEliminar]);
            console.log(infoRepuestoEliminar[0].affecedRows ? "Repuesto eliminado":"No se pudo eliminar el repuesto");
            break;
        case OPC_AGREGAR_REPUESTO:
            console.log("Ingrese el id del repuesto que quiere agregar");
            const idRepuestoAgregado = Number(leer());
            const infoRepuestoAgregado = await conexionDB.query("INSERT INTO repuestos (nombre, precio, marca, stock) VALUES (String, Number, String, Number)");
            console.table(infoRepuestoAgregado[0]);
            
        default:
            console.log("opcion no reconocida");
            break;
    }
}

/**
 * Muestra la planilla/
*/
function MostrarPlanilla() {
    console.log("Planilla");
    console.log("\t1 - Ver repuestos");
    console.log("\t2 - Ver un repuesto");
    console.log("\t3 - Eliminar un repuesto");
    console.log("\t4 - Agregar un repuesto");
    
    
    console.log("\t0 - Salir");
    
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
