;; domain file: domain-a1.pddl
(define (domain vacuumCleanerAgent)
    (:requirements :strips :conditional-effects :negative-preconditions)
    (:predicates
        (location ?from)
        (connected ?from ?to)
        (clean ?room)
        (recharge_room ?room)
        (battery_100  )
        (battery_90  )
        (battery_80  )
        (battery_70  )
        (battery_60  )
        (battery_50  )
        (battery_40  )
        (battery_30  )
        (battery_20  )
        (battery_10  )
    )
    
        (:action Move
            :parameters (?from ?to )
            :precondition (and
                (location ?from)
                (connected ?from ?to)
                (battery_10  )
            )
            :effect (and
                (not (location ?from))
                (location ?to)
            )
        )
        
        (:action Recharge
            :parameters (?room )
            :precondition (and
                (location ?room)
                (recharge_room ?room)
                (battery_10  )
                )
            :effect (and
                (battery_100 )
                (battery_90  )
                (battery_80  )
                (battery_70  )
                (battery_60  )
                (battery_50  )
                (battery_40  )
                (battery_30  )
                (battery_20  )
                (battery_10  )))
        
        (:action Clean
            :parameters (?room )
            :precondition (and
                (location ?room)
                (battery_10  )
            )
            :effect (and
                (clean ?room)
                (when (and (battery_100  ))
                    (and (not (battery_100  ))
                ))
                (when (and (not (battery_100  )) (battery_90  ))
                    (and (not (battery_90  ))
                ))
                (when (and (not (battery_90  )) (battery_80  ))
                    (and (not (battery_80  ))
                ))
                (when (and (not (battery_80  )) (battery_70  ))
                    (and (not (battery_70  ))
                ))
                (when (and (not (battery_70  )) (battery_60  ))
                    (and (not (battery_60  ))
                ))
                (when (and (not (battery_60  )) (battery_50  ))
                    (and (not (battery_50  ))
                ))
                (when (and (not (battery_50  )) (battery_40  ))
                    (and (not (battery_40  ))
                ))
                (when (and (not (battery_40  )) (battery_30  ))
                    (and (not (battery_30  ))
                ))
                (when (and (not (battery_30  )) (battery_20  ))
                    (and (not (battery_20  ))
                ))
                (when (and (not (battery_20  )) (battery_10  ))
                    (and (not (battery_10  ))
                ))
                
            )
        )
)