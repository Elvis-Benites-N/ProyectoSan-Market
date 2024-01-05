export const customDebounce = (callback: () => void, wait: number) => {
    let timeoutId: NodeJS.Timeout;

    return () => {
      window.clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        callback();
      }, wait);
    };
  }

// export namespace FunctionsUtil {
//     export function debounce(callback: () => void, wait: number, timerId?: NodeJS.Timeout) {
//         // let timerId: NodeJS.Timeout;

//         if(timerId){
//             clearTimeout(timerId);
//         }

//         setTimeout(() => {
//             callback();
//         }, wait);

//         // return (...args: any[]) => {
//         //     clearTimeout(timerId);
//         //     timerId = setTimeout(() => {
//         //         callback(...args);
//         //     }, wait);
//         // };
//     }
// }