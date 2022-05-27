(define (domain vacuum)
  (:predicates (clean ?room)
               (location ?room)
               (connected ?room1 ?room2))
  (:action move
           :parameters (?from ?to)
           :precondition (and (location ?from)
                              (connected ?from ?to))
           :effect (and (not (location ?from))
                        (location ?to)))
  (:action suck
           :parameters (?room)
           :precondition (location ?room)
           :effect (clean ?room))                 
  )