class _Promise {
    state: 'pending' | 'fulfilled' | 'rejected'
    constructor(){
        this.state = 'pending';
    }
}