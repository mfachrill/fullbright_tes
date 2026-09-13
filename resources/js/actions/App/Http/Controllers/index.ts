import AnalyticsController from './AnalyticsController'
import HeartbeatController from './HeartbeatController'
import LabsController from './LabsController'
import Admin from './Admin'
const Controllers = {
    AnalyticsController: Object.assign(AnalyticsController, AnalyticsController),
HeartbeatController: Object.assign(HeartbeatController, HeartbeatController),
LabsController: Object.assign(LabsController, LabsController),
Admin: Object.assign(Admin, Admin),
}

export default Controllers