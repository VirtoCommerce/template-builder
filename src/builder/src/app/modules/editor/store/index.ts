import { EditorEffects } from './editor.effects';
import { PreviewEffects } from './preview.effects';

export * from './editor.effects';
export * from './editor.selectors';
export * as editorActions from './editor.actions';
export { editorReducer } from './editor.reducers';

export const EFFECTS = [EditorEffects, PreviewEffects];
