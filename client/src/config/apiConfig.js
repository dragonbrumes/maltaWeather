let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === 'malta-weather.net') {
    backendHost = 'http://52ebfe0d26d2472aac2bb56f1282a414.testmyurl.ws';
    // } else if (hostname === 'staging.realsite.com') {
    //     backendHost = 'https://staging.api.realsite.com';
    // } else if (/^qa/.test(hostname)) {
    //     backendHost = `https://api.${hostname}`;
} else {
    backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080';
}

// export const API_ROOT = `${backendHost}/api/${apiVersion}`;
export const API_ROOT = `${backendHost}/api/`;