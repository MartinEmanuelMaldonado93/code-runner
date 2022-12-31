import CodeMirror, { useCodeMirror, } from '@uiw/react-codemirror';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useMemo, useState } from 'react';
const { log } = console;
 
function CodeEditor() {
    const defaultProblem = "/** * @param {number[]} nums * @return {boolean} */\n\nlet containsDuplicate = function(nums) {\n\n\n} ";
    
    const [code, setCode] = useState(defaultProblem);

    const onChangeCallback = useCallback((value:string, viewUpdate: ViewUpdate) => {
        log( viewUpdate);
    }, []);

    const onChangeSimple = (value: string, viewUpdate: ViewUpdate) => {
        // setCode(value);
        log(viewUpdate.changes);
    };
    // const onChangeMemo = useMemo(() =>
    //     (value: string, viewUpdate: ViewUpdate) => {
    //     console.log( viewUpdate);
    // }, []);
    
    return <>
        <CodeMirror
            value={code}
            height="400px"
            width='500px'
            basicSetup={{
                foldGutter: true,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: false,
                bracketMatching: true,
                highlightSelectionMatches: true,
                
            }}
            theme={"dark"}
            extensions={[javascript({ jsx: true })]}
            onChange={
                // onChangeCallback
                onChangeSimple
            }
        />
    </>;
}

export default CodeEditor;
