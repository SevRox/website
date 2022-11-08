export interface EbikeData {
    id: number;
    boardId: number;
    timestamp: Date;
    battery_temp: number;
    motor_temp: number;
    mosfet_temp: number;
    motor_current: number;
    battery_current: number;
    battery_voltage: number;
    throttle_val: number;
    rmp: number;
    duty_cycle_now: number;
    amp_hours_used: number;
    amp_hours_charged: number;
    watt_hours_used: number;
    watt_hours_charged: number;
    error_code: number;
}