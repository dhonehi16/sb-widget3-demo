document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search)
    const editorParam = params.get('editor')

    if (!editorParam || editorParam === 'true') {
        initEditor()
    }
})

function initEditor() {
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdn.jsdelivr.net/npm/vscode-codicons@0.0.17/dist/codicon.min.css" rel="stylesheet">')
    document.body.insertAdjacentHTML('beforeend', '<script type="text/javascript" src="https://unpkg.com/monaco-editor@latest/min/vs/loader.js"></script>')

    require.config({paths: {'vs': 'https://unpkg.com/monaco-editor@latest/min/vs'}});

    window.MonacoEnvironment = {
        getWorkerUrl: function (workerId, label) {
            return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');`
            )}`;
        }
    };

    require(["vs/editor/editor.main"], function () {
        const script = localStorage.getItem('sb-script')

        window.editor = monaco.editor.create(document.querySelector('.monaco-editor'), {
            value: script,
            language: 'javascript',
            theme: 'vs-dark',
        });
    });
}
