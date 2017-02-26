import { Viewer } from './viewerSchema';

export default {
  viewer: {
    type: Viewer,
    resolve() {
      return {
        id: 'VIEWER_ID',
      };
    }
  }
}
