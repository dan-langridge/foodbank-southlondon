
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faArrowDown,
    faArrowUp,
    faComment,
    faEdit,
    faExclamationCircle,
    faChevronLeft,
    faChevronRight,
    faSpinner,
    faTimes
} from '@fortawesome/free-solid-svg-icons'

// Add more icons here when required

export default function setupIcons() {
    library.add(
        faArrowDown,
        faArrowUp,
        faComment,
        faEdit,
        faExclamationCircle,
        faChevronLeft,
        faChevronRight,
        faSpinner,
        faTimes
    );
}
