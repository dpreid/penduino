//Need to update the achievements for the pendulum - examples are for spinner


const achievementStore = {
    state: () => ({
        achievements: [
            
            {name:'drive-range', verbose:'Set drive across a range of values', completed: false, hidden: false, fractional: [
                {name:'max-value', completed: false},
                {name:'middle-value', completed: false},
                {name:'small-value', completed: false},

            ], required: 3, n: 0}, 

            {name:'brake-range', verbose:'Set brake across a range of values', completed: false, hidden: false, fractional: [
                {name:'max-value', completed: false},
                {name:'middle-value', completed: false},
                {name:'small-value', completed: false},

            ], required: 3, n: 0},

            {name:'sampling-range', verbose:'Set samping rate across a range of values', completed: false, hidden: false, fractional: [
                {name:'max-value', completed: false},
                {name:'middle-value', completed: false},
                {name:'small-value', completed: false},

            ], required: 3, n: 0},

            {name:'ruler-size', verbose:'Update the ruler size', completed: false, hidden: false},
            {name:'plot-trig', verbose:'Plot a trigonometric function', completed: false, hidden: false},
            {name:'plot-correct', verbose:'Plotted a trig function with appropriate frequency', completed: false, hidden: false},
            {name:'data-max', verbose:'Recorded the max number of data points', completed: false, hidden: false},
            {name:'multiple-starts', verbose:'Start the pendulum 10 times', completed: false, hidden: false, required: 10, n: 0}, 
            {name:'multiple-brakes', verbose:'Brake the pendulum 10 times', completed: false, hidden: false, required: 10, n: 0}, 
            {name:'download-data', verbose:'Download a dataset with N > 100 points', completed: false, hidden: false},
            {name:'calibrate-hardware', verbose:'Calibrated the encoder', completed: false, hidden: false},
            {name:'plot-free', verbose:'Plotted a free decay', completed: false, hidden: false},
            {name:'set-load', verbose:'Used the load mode', completed: false, hidden: false},
            {name:'auto-command', verbose:'Set an autocommand to run', completed: false, hidden: false},
            {name:'plot-decay', verbose:'Plot an free decay close to that expected', completed: false, hidden: false},

        ],
        new_achievement_update: false,
        new_achievement_count: 0,

       }),
       mutations:{
        LOAD_ACHIEVEMENTS(state, achievements_to_load){
            let updated_achievements = [];
            state.achievements.forEach(achievement => {
                let update_achievement = achievements_to_load.find(ach => ach.name == achievement.name);
                if(update_achievement != undefined){
                    updated_achievements.push(update_achievement);
                } else{
                    updated_achievements.push(achievement);
                }
            })

            state.achievements = updated_achievements;
        },
         SET_ACHIEVEMENT_COMPLETED(state, name){
            state.achievements.forEach(item => {
                if(item.name == name){
                    item.completed = true;
                }
            });
         },
         //payload -> achievement = {name: name, fractional: fractional}
         SET_FRACTIONAL_ACHIEVEMENT_COMPLETED(state, achievement){
            state.achievements.forEach(item => {
                if(item.name == achievement.name){
                    if('fractional' in item){
                        item.fractional.forEach(frac => {
                            if(frac.name == achievement.fractional && !frac.completed){
                                frac.completed = true;
                                item.n++;
    
                                if(item.n >= item.required){
                                    item.completed = true;
                                }
                            }
                        })
                    }
                }
            });
         },
         ADD_MULTIPLE_ACHIEVEMENT(state, name){
            state.achievements.forEach(item => {
                if(item.name == name){
                    if('n' in item){
                        if(item.n >= item.required - 1){
                            item.n++;
                            item.completed = true;
                        } else {
                            item.n++;
                        }
                    }
                }
            });
         },
         SET_ACHIEVEMENT_UPDATE(state, set){
             if(set){
                state.new_achievement_count += 1;
             } else{
                state.new_achievement_count = 0;
             }
             state.new_achievement_update = set;
             
         },
         CLEAR_COMPLETED_ACHIEVEMENTS(state){
             state.achievements.forEach(achievement => {
                 achievement.completed = false;
             })
         }
         

       },
       actions:{
        loadAchievements(context, achievements){
            context.commit('LOAD_ACHIEVEMENTS', achievements);
        },
        setAchievementCompleted(context, name){
             if(context.getters.getAchievementsUncompleted.includes(name)){
                context.commit('SET_ACHIEVEMENT_COMPLETED', name);
                context.commit('SET_ACHIEVEMENT_UPDATE', true);
                
                context.dispatch('logAchievements', context.state.achievements, {root: true});        //log the achievements everytime an achievement is completed
             }
         },
         setFractionalAchievementCompleted(context, achievement){
            if(context.getters.getAchievementsUncompleted.includes(achievement.name)){
                let n_previous = context.getters.getAchievementByName(achievement.name).n
                context.commit('SET_FRACTIONAL_ACHIEVEMENT_COMPLETED', achievement);
                let n_current = context.getters.getAchievementByName(achievement.name).n
                let required = context.getters.getAchievementByName(achievement.name).required
                if(n_current > n_previous && n_current <= required){
                    context.commit('SET_ACHIEVEMENT_UPDATE', true);
                }

            }
         },
         addMultipleAchievement(context, name){
            if(context.getters.getAchievementsUncompleted.includes(name)){
                context.commit('ADD_MULTIPLE_ACHIEVEMENT', name);
                context.commit('SET_ACHIEVEMENT_UPDATE', true);     //although perhaps not completed, should show some kind of update to progress.
            }
         },
         setAchievementUpdate(context, set){
             context.commit('SET_ACHIEVEMENT_UPDATE', set);
         },
         checkPIDControllerConditions(context){
            
           if(context.rootState.data.p != 1 && context.rootState.data.i == 0 && context.rootState.data.d == 0){
               context.dispatch('setAchievementCompleted', 'p-controller');
               context.dispatch('setFractionalAchievementCompleted', {name:'all-controllers', fractional:'p-controller'});
           } 
           else if(context.rootState.data.p > 0 && context.rootState.data.i > 0 && context.rootState.data.d == 0){
               context.dispatch('setFractionalAchievementCompleted', {name:'all-controllers', fractional:'pi-controller'});
           } 
           else if(context.rootState.data.p > 0 && context.rootState.data.i == 0 && context.rootState.data.d > 0){
                context.dispatch('setFractionalAchievementCompleted', {name:'all-controllers', fractional:'pd-controller'});
            } 
           else if(context.rootState.data.p > 0 && context.rootState.data.i > 0 && context.rootState.data.d > 0){
               context.dispatch('setFractionalAchievementCompleted', {name:'all-controllers', fractional:'pid-controller'});
           } 
        },
        clearCompletedAchievements(context){
            context.commit('CLEAR_COMPLETED_ACHIEVEMENTS');
        }


       },
       getters:{
         getAchievements(state){
            return state.achievements;
         },
         getAchievementsCompleted(state){
             let completed = [];
            state.achievements.forEach(item => {
                if(item.completed){
                    completed.push(item.name);
                }
            });
            return completed;
         },
         getAchievementsUncompleted(state){
            let uncompleted = [];
            state.achievements.forEach(item => {
                if(!item.completed){
                    uncompleted.push(item.name);
                }
            });
            return uncompleted;
         },
         getAchievementUpdated(state){
             return state.new_achievement_update;
         },
         getNewAchievementCount(state){
             return state.new_achievement_count;
         },
         getAchievementByName: (state) => (name) => {
            return state.achievements.find(achievement => achievement.name == name);
         },
         
          
         
       },  
  
  }

  export default achievementStore;
