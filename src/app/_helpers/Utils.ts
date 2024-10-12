
export class Utils{



    public static groupBy<T, K>(list: T[], getKey: (item: T) => K) {
        const map = new Map<K, T[]>();
        list.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return Array.from(map.values());
    }




    public static  validarEmail(valor:string) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
            return true;
        } else {
         //alert("La dirección de email es incorrecta!.");
         return false;
        }
      }


      fixRut(rut:string)
      {
        if(rut.length < 2) return rut;
        var ret:string;
        
        ret = rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();
    
        var result = ret.slice(-4, -1) + '-' + ret.substr(ret.length - 1)
        for (var i = 4; i < ret.length; i += 3) {
          result = ret.slice(-3 - i, -i) + '.' + result
        }
    
    
        return result;
      }
}