import { BlockViewModel } from './models';
import { measureElement } from './helpers';

export class PreviewInteractor {

    private inactive = false; // use with dnd

    scrollTo(vm: BlockViewModel) {
        if (this.inactive) return;
        const rect = measureElement(vm.element);
        const targetPosition = rect.top - window.innerHeight / 10;
        window.scroll({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}
