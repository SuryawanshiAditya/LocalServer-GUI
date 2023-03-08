const {
    exec
} = require('child_process');
const os = require('os');
const platform = os.platform();

async function forward_port() {

    // windows
    if (platform === 'win32') {
        let bore = '..\\port-forwarding-service\\service\\bore.exe'

        // prot forwarding
        exec(`${bore} local 7777 --to bore.pub > log.txt`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            } else {
                // execute below command 
                exec(`powershell -Command "(Select-String -Path log.txt -Pattern 'bore.pub:[0-9]{5}' -AllMatches).Matches.Value | Out-File link.txt"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error}`);
                        return;
                    }
                    console.log(`Output: ${stdout}`);
                });
            }
        });

    }

    // linux
    else if (platform === 'linux') {

        let bore = 'src/server/port-forwarding/service/bore'


        // prot forwarding
        exec(`${bore} local 7777 --to bore.pub > src/server/port-forwarding/data/log.txt`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                return;
            }
        });

        // get the link from logs
        setTimeout(() => {
            exec(`echo $(cat src/server/port-forwarding/data/log.txt) | grep -o -P 'bore.pub.{0,6}' > src/server/port-forwarding/data/link.txt`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error}`);
                    return;
                }
            });

            setTimeout(() => {
                exec(`echo $(cat src/server/port-forwarding/data/link.txt | grep -o -P 'bore.pub:.{0,6}') > src/server/port-forwarding/data/link.txt`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${error}`);
                        return;
                    }
                });
            }, 2000);
        }, 2000);
    }

}

// export the function
module.exports = forward_port;