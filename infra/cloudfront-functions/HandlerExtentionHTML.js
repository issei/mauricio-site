function handler(event) {
    var request = event.request;
    var uri = request.uri;
    if (uri === '/' || uri === '') {
        request.uri = '/index';
    }
    // 1. Se for a raiz exata (vazio ou apenas /)
    if (!uri.includes('.')) {
        request.uri += '.html';
    }

    return request;
}