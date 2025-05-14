import { Router, Request, Response, NextFunction } from 'express';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { MonthlyPlan } from '../model/MonthlyPlan';
import { Item } from '../model/Item';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.post('/loginAsUser', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });


    router.post('/registerUser', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const isAdvisor = req.body.isAdvisor;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({email: email, password: password, name: name, isAdvisor: isAdvisor, address: address, nickname: nickname});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find({ isAdvisor: false });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllAdvisors', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find({ isAdvisor: true });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/addMonthlyPlan', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            //const { userId, monthName, limit } = req.body;
            const userId = req.query.userid;
            const monthName = req.query.monthName;
            const limit = req.query.limit;

            try {
                const user = await User.findOne({ _id: userId, isAdvisor: false });
                if (!user) {
                    return res.status(400).send('User not found');
                }

                const monthlyPlan = new MonthlyPlan({
                    monthName,
                    limit,
                    user: userId
                });

                const savedPlan = await monthlyPlan.save();
                res.status(200).send(savedPlan);
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal server error.');
            }
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/addItem', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            //const { name, amount, monthlyPlan } = req.body;
            const name = req.query.name;
            const amount = req.query.amount;
            const monthlyPlan = req.query.monthlyPlan;

            try {
                // Check if the monthly plan exists
                const plan = await MonthlyPlan.findById(monthlyPlan);
                if (!plan) {
                    return res.status(400).send('Monthly plan not found.');
                }

                // Create a new Item
                const item = new Item({
                    name,
                    amount,
                    monthlyPlan
                });

                // Save the Item
                const savedItem = await item.save();
                res.status(200).send(savedItem);
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal server error.');
            }
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getUserMonthlyPlans', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const userId = req.query.id;

            try {
                // Find all monthly plans linked to the logged-in user
                const monthlyPlans = await MonthlyPlan.find({ user: userId });
                res.status(200).send(monthlyPlans);
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal server error.');
            }
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getItemsByMonthlyPlan', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const monthlyPlanId = req.query.monthlyPlan;

            try {
                // Check if the monthly plan exists
                const plan = await MonthlyPlan.findById(monthlyPlanId);
                if (!plan) {
                    return res.status(400).send('Monthly plan not found.');
                }

                // Find all items linked to the specified monthly plan
                const items = await Item.find({ monthlyPlan: monthlyPlanId });
                res.status(200).send(items);
            } catch (error) {
                console.log(error);
                res.status(500).send('Internal server error.');
            }
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
}