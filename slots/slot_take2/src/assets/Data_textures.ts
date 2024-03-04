import * as PIXI from 'pixi.js'
import { ref } from 'vue';
import { SymbolData, generateType } from './Data';

export let slotTextures: PIXI.Texture<PIXI.Resource>[] = []
export const AssetsLoaded = ref<boolean>(false);
interface ISymbolimages { 
    [key : number] : string
}
export const Symbolimages : ISymbolimages = {
    0 : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-soOVtjjk-DU6V5MOQsDKyGoYx9hM_c__QKL-v4MhA&s',
    1 : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAC0QAAICAQQBAgUCBwAAAAAAAAABAhEhEjFBUWEicQOBkaHwMsETI0JSsdHx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APEiFIjTRT6K25O3uPNuyfvuBAABp+rL3MlQYShCgQqGrvgyVMKA3D4c5RlOMJOMVcmlaitsmCUAAUAgKAAAAAALWMP5ENxjFyqTpdoyBCFISil/x2QflFAMFtAiViwVfpolAgQoINKVWotpNZzuZCDLAYBaYEDYAAAUABuMb5W1kCVnii0QWRVohSWWBtsDUHHVHW5KOzaVtLmkTS6usd8EolfTsFbXt4REtWwouysbiOm/Vt7CXgVKgALFAC1h5QENR0+rU5bemu/yzIoAAgACYRr+HLQp16ZNxT7ar/aAKNul6qSquwTmwERgAiqBaYTrbBQeCuWKr58si8kYgslRPYLAEAqz89yBOvuQi0Sik/PYUDcpKkoqu/O/09jDr+kCgytt7kLuKIC1h5Xt2WMXJXaXV85S/cUQdBB4FCn0CvRp3lqvbiuM/UCkZHKXZW0Fs8SvjJREWMXKUY7Nus4IL+21Eo09rMl58EKFAr2IyUAABfTjfO/j2IAAAKWCBJ1ZbRE8+CDV+mSpZad9EbbVdbeAgBqMNUktUV5eyEpa5Xpin/bFYJHRnXe2K7CdbeMvgCAIAQ1cdFaXqv8AVfHRkAAAAKk3srxZCr3azxwKLTpS0vOzrAr69EbelK8Zx0G/+gQtEDYAAAKCCAoAACoENOKUqjJS8rb7gQCgBadXivcEbzf3ooGQAACBUr6W+/gCAACkKAFogL8gIAAAAr2AFtEACi4fHzLBapKLajbSt7KyAMgt+nTx2RAAABEAABXkACD3Blu9wlalh0mn5QtGAQroE2S0E7KtUDmgBDfxFBT/AJcpOPbik/OMmQwIUAAnvhO1WRRr4Wl6tUnHDqo3b4T8GQIBQAoAAEAApHgmojdhKNkICIAACiJCxCuq0+p6pauMb+5AQqqBRAKy6XSdOnyZNqdRcaWat0rx0wMvwBJaeU/YALenTxvQBAKCFAy8EssjISgAIBCgCApAgVEKgNgymaKtVBEAVQQoESSAAAqaIAALRQP/2Q==',
    2 : 'https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg',
    3:  'data:image/jpeg;base64,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',
    4 : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKgAswMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBQQG/8QAGBABAQEBAQAAAAAAAAAAAAAAAAEREgL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBQQH/8QAGhEBAQEBAQEBAAAAAAAAAAAAAAEREgIDE//aAAwDAQACEQMRAD8A+EwYvBj1Y+hcs8HLTkclg4Z8jlpyORg4ZcjlryORhcMrC5a3yOSwuGXI5aXyORg4Z4MaXyXILlnYMaXyVhFyzwYvBgLlngsXYWAr5RhWLwWBFjPAvACx7JDxcgxrjozynBjTDnkYvhlPJ8tOT5GHwy5LltyORg/NjyOW18lfJYXDG+S5bYVgwr4ZXyV8tcKwsRfDKzCsaWFYSb5Z2FY0xNhJvlGFYvEkixOJsXSCbEBQCMe/FYciseh1J5TIeKw5Cxc8lIMXgw18owYsgOU4mxoSaViLE2LpUk2M7CsXU0mdicTYtNTUWJxNi00IsQVVSJnYlNVU0mdSAAh1MVIIp6HXkGAKgXIIKAFFQYoJNI6QpVNTVVNQikmqTSZ1JGQZ1NSqpTUUqlVTSZ1NI6VJnSAAS6sMop6XXhwCANIAAAKR0iSVI6QqampqqmoRU0qpNJFSVUmis6mpVUpRSqaqppM6VTTpUM6QACXVhkceh14qAQBYAFAFIUqCpUGmkmlU1VTUopJqk0kUk1SaVZ1NSqpSilU1VTSZ1NI6VJnSAAS6pphx6nWhxUTDJZikAAQpUEKVMqVTSqaqpqU0kqSSKVTVVNJnU1KqlNRSqaqppMqmlTqaTOgJAQ6sUhUep1pVAhAvTAKgaKACIFQVIqVKnSpVNSRklFKpqqmkmpqaqpqWVTU1VTSZ0k06mkypAAJdOKjOVWvU6Uq5T1Eo019LKp0aQ6UNTotIdHSLS0i06CtLU1NoqaLS0itCaLU2kztFTaLU2prO+h6qLRam1LH16FqbRam0MrRoLQE66Wq1no16NdCemso1lo6Gq6a6NZdDoaO2mjpl0Oi0u2nQvplfRdJtK/RpfQ6Y30V9lqL9Gt9Jvpn0m+itTfo16TfTLouk6i/RpfSb6Z30XRazvtd9JvpF9JtDK+16m1NpaTO+j02egJ6dMGGzpFo0wDLRfQBFU6OgC1NTaXQBItTfSejBM7am+k30ATO+qXSb6MEi+qnpN9AEi+qXSegAzvqlfRX0YJF9UugAE9V//9k=',
}

export function loadassets(){
    PIXI.Assets.load([
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-soOVtjjk-DU6V5MOQsDKyGoYx9hM_c__QKL-v4MhA&s',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAC0QAAICAQQBAgUCBwAAAAAAAAABAhEhEjFBUWEicQOBkaHwMsETI0JSsdHx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APEiFIjTRT6K25O3uPNuyfvuBAABp+rL3MlQYShCgQqGrvgyVMKA3D4c5RlOMJOMVcmlaitsmCUAAUAgKAAAAAALWMP5ENxjFyqTpdoyBCFISil/x2QflFAMFtAiViwVfpolAgQoINKVWotpNZzuZCDLAYBaYEDYAAAUABuMb5W1kCVnii0QWRVohSWWBtsDUHHVHW5KOzaVtLmkTS6usd8EolfTsFbXt4REtWwouysbiOm/Vt7CXgVKgALFAC1h5QENR0+rU5bemu/yzIoAAgACYRr+HLQp16ZNxT7ar/aAKNul6qSquwTmwERgAiqBaYTrbBQeCuWKr58si8kYgslRPYLAEAqz89yBOvuQi0Sik/PYUDcpKkoqu/O/09jDr+kCgytt7kLuKIC1h5Xt2WMXJXaXV85S/cUQdBB4FCn0CvRp3lqvbiuM/UCkZHKXZW0Fs8SvjJREWMXKUY7Nus4IL+21Eo09rMl58EKFAr2IyUAABfTjfO/j2IAAAKWCBJ1ZbRE8+CDV+mSpZad9EbbVdbeAgBqMNUktUV5eyEpa5Xpin/bFYJHRnXe2K7CdbeMvgCAIAQ1cdFaXqv8AVfHRkAAAAKk3srxZCr3azxwKLTpS0vOzrAr69EbelK8Zx0G/+gQtEDYAAAKCCAoAACoENOKUqjJS8rb7gQCgBadXivcEbzf3ooGQAACBUr6W+/gCAACkKAFogL8gIAAAAr2AFtEACi4fHzLBapKLajbSt7KyAMgt+nTx2RAAABEAABXkACD3Blu9wlalh0mn5QtGAQroE2S0E7KtUDmgBDfxFBT/AJcpOPbik/OMmQwIUAAnvhO1WRRr4Wl6tUnHDqo3b4T8GQIBQAoAAEAApHgmojdhKNkICIAACiJCxCuq0+p6pauMb+5AQqqBRAKy6XSdOnyZNqdRcaWat0rx0wMvwBJaeU/YALenTxvQBAKCFAy8EssjISgAIBCgCApAgVEKgNgymaKtVBEAVQQoESSAAAqaIAALRQP/2Q==',
        'https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg',
        'data:image/jpeg;base64,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',
        'data:image/jpeg;base64,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',
    ]).then(() => {
        AssetsLoaded.value = true;
        onAssetsloaded();
    });
}

function onAssetsloaded(){
    slotTextures = [
        PIXI.Texture.from('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-soOVtjjk-DU6V5MOQsDKyGoYx9hM_c__QKL-v4MhA&s'),
        PIXI.Texture.from('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJ4AqAMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDB//EAC0QAAICAQQBAgUCBwAAAAAAAAABAhEhEjFBUWEicQOBkaHwMsETI0JSsdHx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APEiFIjTRT6K25O3uPNuyfvuBAABp+rL3MlQYShCgQqGrvgyVMKA3D4c5RlOMJOMVcmlaitsmCUAAUAgKAAAAAALWMP5ENxjFyqTpdoyBCFISil/x2QflFAMFtAiViwVfpolAgQoINKVWotpNZzuZCDLAYBaYEDYAAAUABuMb5W1kCVnii0QWRVohSWWBtsDUHHVHW5KOzaVtLmkTS6usd8EolfTsFbXt4REtWwouysbiOm/Vt7CXgVKgALFAC1h5QENR0+rU5bemu/yzIoAAgACYRr+HLQp16ZNxT7ar/aAKNul6qSquwTmwERgAiqBaYTrbBQeCuWKr58si8kYgslRPYLAEAqz89yBOvuQi0Sik/PYUDcpKkoqu/O/09jDr+kCgytt7kLuKIC1h5Xt2WMXJXaXV85S/cUQdBB4FCn0CvRp3lqvbiuM/UCkZHKXZW0Fs8SvjJREWMXKUY7Nus4IL+21Eo09rMl58EKFAr2IyUAABfTjfO/j2IAAAKWCBJ1ZbRE8+CDV+mSpZad9EbbVdbeAgBqMNUktUV5eyEpa5Xpin/bFYJHRnXe2K7CdbeMvgCAIAQ1cdFaXqv8AVfHRkAAAAKk3srxZCr3azxwKLTpS0vOzrAr69EbelK8Zx0G/+gQtEDYAAAKCCAoAACoENOKUqjJS8rb7gQCgBadXivcEbzf3ooGQAACBUr6W+/gCAACkKAFogL8gIAAAAr2AFtEACi4fHzLBapKLajbSt7KyAMgt+nTx2RAAABEAABXkACD3Blu9wlalh0mn5QtGAQroE2S0E7KtUDmgBDfxFBT/AJcpOPbik/OMmQwIUAAnvhO1WRRr4Wl6tUnHDqo3b4T8GQIBQAoAAEAApHgmojdhKNkICIAACiJCxCuq0+p6pauMb+5AQqqBRAKy6XSdOnyZNqdRcaWat0rx0wMvwBJaeU/YALenTxvQBAKCFAy8EssjISgAIBCgCApAgVEKgNgymaKtVBEAVQQoESSAAAqaIAALRQP/2Q=='),
        PIXI.Texture.from('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAAA//EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAWAQEBAQAAAAAAAAAAAAAAAAAABwb/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCoDCpsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q=='),
        PIXI.Texture.from('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAK4AuAMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgMBBAUG/8QAMxAAAgIABAUBBwQBBQEAAAAAAAECERIhMUEDIlFhcYEyQlKhscHwgpHR8WJykqLC4RP/xAAaAQEBAQEBAQEAAAAAAAAAAAAAAQIDBAcG/8QAHBEBAQEBAQADAQAAAAAAAAAAAAERIQISMUFR/9oADAMBAAIRAxEAPwD9zFpOOHbR/Dn4OrRbx2W/0MoZZfU1Xr53Pmj9DZiZR6a7xW+vYhcrza9NJeMjf8y13JnHx6aegJVReJIpIxXK1Wv2NovFoSpVHY8uYWRSIxVxdlEIsjNAAEAAAAAAAAADjANmXERbZEmVqMJMHeJG1a1Bp3iOJw75o+139TkGegifD96Ov1JrM9fgvNd+mp2vT7ER7miDN4iUO3ocisL6/c2SOOBNNdjmWiI5GqDNEjqB0jGgAAAAAAAAAAAEtgckZyNLM+IitxjJ5gS0OmnWNUikgkdMuTOfD96OojmbJEyhmQ1NFUEjqQNcoqKOpHQzaAAIAAAAAAAAAHADIkzrZLK1IlsKV5HJ6GeIrcmnEjVsHVLFkArcpI7QMuWh0AIlxOo6AAAAAAAAAAAAAAAcksjoAzbJbL4iMHKitxTZlNVmdbF4six0kZYgOJHDmCt5r6IAMPKAAAAAAAAAAAAAAAAAAAcbBMgrjZlxI37OpTZLZW5GDdanLL4kbzjVrroY4vPqadY1vFl8gZJ/m4C4+oADDygAAAAAAAAAAAAAAAAAA40Q2XZE0FiJ6GLl/Ro2RNf0ajrEt+vbqZ8SN+y83/y07nb9ey317B+f2975Go3GOJ90t+vgFTjaxxaxaNr6aANyvqgA5vGAAAAAAAAAAAAAAAAHGGyGwo2cUgzObK3IriKzzt5msZE8WOLmjqWNTnGMl/616kYqedd9O2hd9XXfPuTNXzXhw+eQ1GzOu/TL8sErTD67/wC46VX1QAcnlAAAAAA5YJbCqTOmdlKQMUS2GyQSO2VeRm2TeHMLi2yGyrxozeWRYsMQbxKiGyVIreEtzsZ2q6HbxRZg1h/jYNTvGnFhizjqjGMs43WK8rqtd8jaE7SX1M+NC846rbqaiz+Vm43w2ku9KrvrpoBCV5Sbvrv410BWux9cAHJ5AAADjZ0iQUs4Q2dsNY62S2GzhRUZXkdbMXy5lRniC4tkSOs42UiVLC/sW3iRnJERlhf8b+A1ipZfyZWbvDNLNedjCarTLztqGvNE8Of4i3zpL1rdGN+fURln/XY1G75GqbVVvlvroXGePLFrv8XgcsoOvl1MXya1307aFPtfG4eJOUdfzIHYTUlXLi306fUEPlZx9QAHN5AA4wONnDjZNhomjF8rs2sz4kSxuCniFmDeE0hPEVr4qIkqeKOvU63n/H2ON/n8BFwniSul328BmMlTUlr07ZmsZ4sNfMLmO3/ZnNen2+Z3YX+dAREZOOiz+HZLrqaPnXXzv8zOUbVVWrrfzoTF020sSeqXv65rIq0nG8nt7Ler85mV06bzW27PVKpq1TUv2l20MZwtU1TWj6f46Fi+ahTrm0rLfLsaVcfgw+eQ8+cXUuVx67LPLQuDwtYbSzpfD/qyK3YSWHJa1dZ6V7WoLpcSCSTS1re+umh0Jr6gAOTyBwHGwJmjFs2ZnxFavoWNxKkdsyZ2L/P3K38TixtX0MLw5np3RlxorBe11XcNeaR4mJVddyn4rtnloeZ3GTbzaNuFLHTf6Sr6851Xau9Z/uQ8WK4vFi8rHn8jt8qb0brLW8w3WJP9VLvsEXCWJJt23ldPPtRLWDTTddDOXI3VXWeWVUvmbRamlKOsly307hPpKa7KO11fjwRKPX1w1fp2GlyjaT75s0hnLhxWUpK4v4VmC8Zxbi8sP+Vafp7mlXFNVb66V37ma14eDJcRvAvge7EZYcTWa/8AooNdZ/EETOGKtE/dv/sedPC8NP8AV72e57+IsuK5c2Csafv9L8GXH4alijN3KPDxuXVdCxvx7/Kxi6g3F9r71pr7IIhKduOLNQ5nesa0Bpuy6//Z'),
        PIXI.Texture.from('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAL0AywMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAABAgMEAAUH/8QAKxAAAgICAgECBgIDAQEAAAAAAAECEQMhEjFBE1EEIjJhcYFSYkKRsdGh/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAEDAgQF/8QAHREBAQEBAQEBAQEBAAAAAAAAAAECESExAxJBYf/aAAwDAQACEQMRAD8A+m5EKkGW9DQiR9fvimLimnJWvYo5favZCxWgN8v0GN9prJzGo6g6iLEZWZGUq2HcjqvV0Wg6SVVozbe06KQlKXcuguo1x+nRSE5JpMzwlQee9FY3PWty0Qy9Mm8049KxfX5amq+4M4sB/YGNR9SVXy1d9foZSbe9x8S9yiI76DiK8fLRQHkOe10ITj3+i8ciiqfYseh0tFZ6/wCkk+TMcc8smRx9CaipfUq3+TZJEmth1OJSXKTXppX7sh8N8NlUeUKjNTq/6+TRkxRyp0mpU0pJ9FIwUVC7k4q/31/6Hf8AXnBik+TSkqdXIololjx8Z5JcpPm74vwVUtfVRGdrJS5KyqTt11+ToRuSRXJCl3Qd61Ok/wAQJ/Kr+rz+BXBPTlYu1pdA4tFksrsacqRCU9hcwk+yTeyrkDh5DaVPwPB6EyRs6MuKDr7GmIxGEyilsMrDIlNUyliS2Fz4b4aScvT8do2qMVviYMTUMqk/B6C2lXTDH9fpX7LoVofiHiVx10ForFCKKS2M07VdBzSziQ40pGlEviFbQXN9QjGMW+Ee3b/PQ65eRoxpBoO+p26jTvf+xJ/DSlK4zlXg0BCWovNH/DpdteRXLlsRgRGkzBkK+hmKnsOo69EZ9lJk2HeQRWO1RBlcYXXws47FaNDRNxCSpUFOtjNADsVKx0yLWx4BzYeSuLNvwvzYY/ZGVbTN3w2PjiivZFYfrrw6Q6iNGI9aDy3SdCS2itHUDpMcVeykscZKhY/WiyQc23rJPA/DpEJQknVX9z0WhJaQdz9Kxwxu98v2aEq0DK+hLDrvWKjq2Ga6Ecq0R6fppdASFcrQY7B/ic+xKKTRGU+LoNM/DS4qUqjS8b6ByF9ReQpR7QXnI1JXFMWSFgx7DP4VR2dFdjhigdJx2PDCpPYyVsvCAc60nihGL0b4LSM/HRfE+kV5t3pxn0Ghq0GPUWgPoeUfYCUr2HXXQhvkO+jkgMOSykI5VsMicg0kLkd7Fs6bqLMnqL+X/wBI2znrpO9+xKcb2aZx2LKGg1zpl4jqXFDODXRLNGVq+g7ll8Tc5O+X6EbHoVoNYRdlFLdE2thjthbGiLXksnG3RPHH5CsI0wwtco3spGNCSutDQcvIcU0Fs0w6IJlsbKy2qkFKtjQH42qDG00GP4JRVNIp4DOuAzmwAgMnJ7Gkybew7jnsVoc6g66yZdsjxNGWOxKDfN8NJbOatEPg4yjjqayW5N/O7L9OwnxygvJnzqKuK8GtLyRyvZDN9YZIm9m70uWyaxxlfF3Wn9mG8/SMvGwcKZqeD2HhGUdMOr+joKooaP1INBQZUWh4R2JZSHYcVSqidjGQHoM+qxKIjBlolZ6c9IeL0K+jkGYsVjWcFSYkuzsmmS9Tk/wGklq8dI5y0Q5q99HOT8dBf5dmltErHavdWHj/AFK7nIetCy6Gk9CkRy0hYw5WykUNQOp1SoSSKyZNsiwIRt0P6dMRaZWU6RS96hnjVEGaZrkmZcmnQaYPF6LQ6IYlckjZjjohu8NH6QN6KpUib+oMJ9NArw5Kia6KQZXOjy1Ffb7km7dFJ/QyV3+g5zBcq0RnL71+CnZHKtMNMydQyP8AtL/ZJc4yW7i+0+yjWzn0G8h4ZVLtaXd9jSyKeoq0jN26LQhaCXMnqiywlNxbp+zKKUf5R/2ZJ4l5E4RWgn8RtWg2BtJJPv8A6AODrsE5UF9onk2RJCSmK5CyXsLFySdhtIp2FS8EnIEZ1JBf5Wg9s6ePmgtUrByDgMEeLNUWZlL5isZbKmouuiN7YzfyicthxIu/pHh0Si7RaPQZ6cyWRNfMuyknoRu9AiXqpd9k59/kfLH5kI4htniMuxGx5rZOSDWOT2aYS0Y7oeM9hdTrRJ2ITchHIJMtseXKfKNb07ux1oNbA9hg5slNjtaJT6I6zCydIlKQZMR/SG0gXs6xbFlINJGlZfk4iKeyUZ2dF9hzMNCnTsb1oLfkzpgl0C4lbecZQdBgyGGXKJRIMrOLx2y8eiOIulorDRZPQuPyUe0JCPYTqM3cvwKPkWyUpqPYa59B9k8+g+tGyGfJGSaQa5zepzmPB2TRSPQbWcOKFPYGHL0+SrZOTd66EhLdHTeg80ydOwSVomnTDysi8vUpRpk5bLS2TaDSVFxEki0kI0/AaSptfKwx6Oal5HeqDvopaOyBiw8bVhx1X4ePGMTRw5ImotYYtDYcyen2gw12+qwag1fuWiqVLq39xIb2UKwv1wGF3WiU+VAkJkkltmLNbdro0T5LtWSlvxQej8/EKIz7NUlojOIb5vpY/couL6EWgqVOwtUqkAK2rDQcLxXzqQZM6ciTdsjKTtM+gx6BE5vYUwrD4OQCuN6O4UOlv5evNipq3f4B1Bxu0CqVVfgrPG27Utexyx70Hc0nHDbtbf8Awvjg00pdCw5JpP5l/Iqu9Bzq9Vm4qFIySjwyJryWb/h+yMmk99lc4isJSTRpxzb0zJJxpUGGbiVNZ632Hsywl6lS9jUnpEYanE8kTPOBqkSa2Hebxklp0RyGucdkZRt0G+aztaHhitWaFitHceOg6v6FjGlQ3EeKDQZ2oyR1aF/yKIjqulqhb2M+gBICZWPRJ6NWBJthNXidLySy1FXJ1Dz+SsU/Xypu0qa+1hnG1XuHMrPKThCajG2lcfyYfg/iskssvWn8ns10/Y0fFZZRywxQfFc0m/c1cYxk0l1sNZZJ7/roW/qVL8DJxjJXSlLr7gO9KPrLLXzcaLGZ5XXy9med83ZSbtkpO2HWYCfJ/geMbZ0ByrapHSLwlrZmDCTt/wBeiMtRec4rin9UugMnjcnmyqUrSa4qutFGHMSyOkyUEnbZafQqDSXw1O1XRPLG4tFF0cElSxu9exQVoAV//9k='),
    ]
}


interface AnimationSet {
    [key: number]: number[][];
}


export const animationsets : AnimationSet = {}
export const animationsets_quickplay : AnimationSet = {}

export function generateanimationsets(){
    for(let key in SymbolData){
        const setforconcretekey = []
        for(let i = 0 ; i < 12 - parseInt(key, 10); i++){
            const newset : number[] = []
        for(let i =0; i < 20 ; i++){
            newset.push(generateType())
        }
        newset[1] = 0
        newset[18] = parseInt(key , 10)
        setforconcretekey.push(newset)
        }
        animationsets[parseInt(key, 10)] = setforconcretekey
    }


    for(let key in SymbolData){
        const setforconcretekey = []
        for(let i = 0 ; i < 4; i++){
            const newset : number[] = []
        for(let i =0; i < 5 ; i++){
            newset.push(generateType())
        }
        newset[1] = 0
        newset[3] = parseInt(key , 10)
        setforconcretekey.push(newset)
        }
        animationsets_quickplay[parseInt(key, 10)] = setforconcretekey
    }
}